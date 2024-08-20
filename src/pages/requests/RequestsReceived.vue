<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul>
        <request-item
          v-for="req in requestReceived"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
          >{{ req }}</request-item
        >
      </ul>
      <h3 v-if="!hasRequestRecived">No Request Recieved at this moment.</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  computed: {
    requestReceived() {
      return this.$store.getters['requests/requests'];
    },
    hasRequestRecived() {
      return this.$store.getters['requests/hasRequests'];
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
