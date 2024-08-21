<template>
  <div>
    <!-- '!!' convert an truthy value like string with value to boolean -->
    <base-dialog
      :show="!!error"
      title="An Error occurred!!"
      @close="errorHandler"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="control">
          <base-button :link="false" mode="outline" @click="getCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isLoading" :link="true" to="/register"
            >Register as a Coach</base-button
          >
          <!-- link means :link="true" -->
        </div>
        <div v-if="isLoading && shouldUpdate">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </ul>
        <h3 v-else>No Coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/coachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    BaseButton,
    CoachFilter,
  },
  created() {
    this.getCoaches();
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((caoch) => {
        if (this.activeFilters.frontend && caoch.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && caoch.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && caoch.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    shouldUpdate() {
      return this.$store.getters['coaches/shouldUpdate'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async getCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/fetchCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong';
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
