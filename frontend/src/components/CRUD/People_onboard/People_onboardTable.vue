<template>
  <div>
    <router-link :to="$route.fullPath + '/new'">
      <v-btn color="primary mb-3"> New </v-btn>
    </router-link>
    <v-btn color="primary mb-3 mx-3" @click="addFilter"> Add filter </v-btn>

    <div class="my-4 ml-3">
      <a :href="externalLink"> API documentation for people_onboard </a>
    </div>

    <v-card class="mb-6 mt-3 pa-3" v-show="showFilters">
      <FilterForm
        v-for="(component, index) in config"
        :filters="filters"
        :key="index"
        :id="index"
        @apply="apply"
        @delFilter="delFilter(index)"
      />
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn class="default mr-3" @click="clearFilters"> Clear </v-btn>
          <v-btn class="primary mb-3" @click="submitHandler"> Apply </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="tableData"
      :search="search"
      :loading="loading"
      @click:row="rowClickHandler"
      :options.sync="options"
      :server-items-length="count"
      :footer-props="{
        'items-per-page-options': [10, 20, 50, 100],
      }"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Filter"
          class="mx-4"
        ></v-text-field>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="greyTint">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <router-link
              class="text-decoration-none"
              :to="`/admin/people_onboard/${item.id}/edit`"
            >
              <v-list-item>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item @click="showDeleteModal(item.id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data>
        <span>No matching records</span>
      </template>
    </v-data-table>

    <v-dialog v-model="modal" max-width="390">
      <v-card>
        <v-card-title class="headline greyMedium--text"
          >Confirm delete</v-card-title
        >

        <v-card-text> Are you sure you want to delete this item? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="modal = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="del"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import FilterForm from '@/components/Filter/Filter';

  export default {
    components: { FilterForm },
    data() {
      return {
        config: [],
        search: '',
        modal: false,
        headers: [
          { text: 'Nome Completo', value: 'nome_completo' },
          { text: 'Camarote', value: 'camarote' },
          { text: 'Função', value: 'funcao' },
          { text: 'Embarque', value: 'embarque' },
          { text: 'Desembarque', value: 'desembarque' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        showFilters: false,
        filters: [
          { label: 'Nome Completo', title: 'nome_completo' },
          { label: 'Camarote', title: 'camarote' },
          { label: 'Função', title: 'funcao' },
          { label: 'Embarque', title: 'embarque' },
          { label: 'Desembarque', title: 'desembarque' },
        ],
        options: {},
      };
    },
    watch: {
      options: {
        handler() {
          this.getData({
            page: this.options.page - 1,
            limit: this.options.itemsPerPage,
            field: this.options.sortBy[0],
            sort: this.options.sortDesc[0] === true ? 'desc' : 'asc',
          });
        },
        deep: true,
      },
    },
    computed: {
      ...mapState({
        loading: (state) => state.people_onboard.loading,
        tableData: (state) => state.people_onboard.rows,
        modalOpen: (state) => state.people_onboard.modalOpen,
        deleteId: (state) => state.people_onboard.deleteId,
        count: (state) => state.people_onboard.count,
      }),
      dataFormatter() {
        return dataFormatter;
      },
      externalLink: () => {
        return process.env.NODE_ENV === 'production'
          ? window.location.origin + '/api-docs/#/People_onboard'
          : 'http://localhost:8080/api-docs/#/People_onboard';
      },
    },
    methods: {
      ...mapActions({
        getData: 'people_onboard/getData',
        getFilteredData: 'people_onboard/getFilteredData',
        deleteItem: 'people_onboard/deleteItem',
      }),
      ...mapMutations({
        setDeleteId: 'people_onboard/setDeleteId',
      }),
      delFilter(index) {
        this.config.splice(index, 1);
        this.config.length === 0 ? (this.showFilters = false) : null;
      },
      addFilter() {
        !this.showFilters ? (this.showFilters = true) : null;
        this.config.push({});
      },
      clearFilters() {
        this.getData();
      },
      showDeleteModal(id) {
        this.modal = true;
        this.setDeleteId(id);
      },
      del() {
        this.deleteItem();
        this.modal = false;
      },
      submitHandler() {
        let request = '?';
        this.config.forEach((item) => {
          item.number
            ? (request += `${item.filter}Range=${item.valueFrom}&${item.filter}Range=${item.valueTo}&`)
            : (request += `${item.filter}=${item.value}&`);
        });
        this.getFilteredData(request);
      },
      apply(data) {
        let id = data.id;
        this.config.splice(id, 1, data);
      },
      rowClickHandler(row) {
        this.$router.push(`/admin/people_onboard/${row.id}/edit`);
      },
    },
  };
</script>

<style scoped>
  .image-preview {
    width: 191px;
    height: 141px;
    background-size: cover;
    background-position: 50% center;
  }
  .table-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .file {
    display: block;
    white-space: nowrap;
  }
</style>
