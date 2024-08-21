<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An Error Occourred!"
      @close="errorHandler"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasRequestRecived && !isLoading">
          <request-item
            v-for="req in requestReceived"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
            >{{ req }}</request-item
          >
        </ul>
        <h3 v-else>No Request Recieved at this moment.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  mounted() {
    this.fetchRequests();
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requestReceived() {
      return this.$store.getters['requests/requests'];
    },
    hasRequestRecived() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error || 'something went wrong';
      }
      this.isLoading = false;
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
