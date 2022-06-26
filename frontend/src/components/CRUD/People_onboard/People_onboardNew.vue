<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New People_onboard</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Nome Completo</p>
          </v-col>
          <v-col cols="9">
            <v-textarea
              label="Nome Completo"
              v-model="nome_completo"
            ></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Camarote</p>
          </v-col>
          <v-col cols="9">
            <v-textarea label="Camarote" v-model="camarote"></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Função</p>
          </v-col>
          <v-col cols="9">
            <v-textarea label="Função" v-model="funcao"></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Embarque</p>
          </v-col>
          <v-col cols="9">
            <v-textarea label="Embarque" v-model="embarque"></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Desembarque</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Desembarque"
              v-model="desembarque"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="loading"> Save </v-btn>

        <v-btn @click="resetData" class="ml-2"> Reset </v-btn>

        <router-link :to="cancelUrl" class="text-decoration-none">
          <v-btn type="button" class="ml-2"> Cancel </v-btn>
        </router-link>
      </div>
    </form>
  </v-card>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';

  export default {
    data() {
      return {
        id: null,

        nome_completo: '',

        camarote: '',

        funcao: '',

        embarque: '',

        desembarque: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.people_onboardForm.data,
        loading: (state) => state.people_onboardForm.loading,
      }),

      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
      }),
      ...mapActions({
        newHandler: 'people_onboardForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          nome_completo: this.nome_completo,

          camarote: this.camarote,

          funcao: this.funcao,

          embarque: this.embarque,

          desembarque: this.desembarque,
        };

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/people_onboard');
        } catch (e) {
          console.log(e);
          this.showSnackbar(e);
        }
      },

      resetData() {
        this.nome_completo = '';

        this.camarote = '';

        this.funcao = '';

        this.embarque = '';

        this.desembarque = '';
      },
    },
    async beforeMount() {},
    watch: {},
    components: {
      ImageUploader,
      FileUploader,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
