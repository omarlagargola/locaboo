<template>
  <v-responsive
    class="align-centerfill-height mx-auto"
    max-width="1000"
  >
    <v-row v-if="!isLoading">
      <v-col cols="3">
        <v-text-field
          v-model="searchQuery"
          label="Suche"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          hide-details
          single-line
          density="compact"
        />
      </v-col>
      <v-col cols="9" data-cy="filters">
        <v-btn rounded="xl" variant="outlined" class="mx-1 text-capitalize">Kunde</v-btn>
        <v-btn rounded="xl" variant="outlined" class="mx-1 text-capitalize">Ansprechpartner</v-btn>
        <v-btn rounded="xl" variant="outlined" class="mx-1 text-capitalize">Kundengruppe</v-btn>
        <v-btn rounded="xl" variant="outlined" class="mx-1 text-capitalize" :active="!!getActiveFiltersLength">
          Status {{ getActiveFiltersLength }}
          <v-menu activator="parent" :close-on-content-click="false">
            <v-list density="compact" data-cy="filtersMenu">
              <v-list-item v-for="filter in statusFilter" height="50px" key="filter.label">
                <v-checkbox v-model="filter.checked" :label="filter.label" class="text-capitalize" @update:model-value="updateFilter"/>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn rounded="xl" variant="outlined" class="mx-1 text-capitalize">Weitere Filter</v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="tableHeaders"
      :items="tableItemsFiltered"
      :search="searchQuery"
      :items-per-page="itemsPerPage"
      :page="tablePage"
      :loading="isLoading"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.companyName="{ value }">
        <v-avatar>
          <div class="text-h4">{{ value.avatar }}</div>
        </v-avatar>
        <span class="font-weight-medium">{{ value.name }}</span>
      </template>
      <template v-slot:item.status="{ value }">
        <v-chip color="green" data-cy="status">
          <v-icon icon="mdi-circle-medium"/>
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:item.group="{ value }">
        <v-chip color="purple">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="tablePage"
            :length="Math.ceil(tableItemsFiltered.length / itemsPerPage)"
            rounded="circle"
            density="compact"
            class="table-pagination"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-responsive>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import tableService from '../service/tableService';

  const isLoading = ref(false);
  const tablePage = ref(1);
  const itemsPerPage = ref(6)
  const tableHeaders = ref([]);
  const tableItems = ref([]);
  const tableItemsFiltered = ref([]);
  const searchQuery = ref('');
  const statusFilter = ref([
    { label: "aktiv", checked: true },
    { label: "inaktiv", checked: true },
    { label: "gast", checked: true },
    { label: "registriert", checked: true },
  ]);

  onMounted(async() => {
    isLoading.value = true;
    const { headers, items } = await tableService.getTableData();
    isLoading.value = false;
    tableHeaders.value = headers;
    tableItems.value = items;
    tableItemsFiltered.value = items;
  });

  const getActiveFiltersLength = computed(() => {
    const numOfActiveFilters = statusFilter.value.reduce((acc, curr) => acc += curr.checked ? 1 : 0, 0);
    return numOfActiveFilters === 0 ? null : numOfActiveFilters;
  });

  function getFilter(filter){
    return statusFilter.value.find(status => status.label === filter);
  };

  function updateFilter(){
    tableItemsFiltered.value = tableItems.value.filter(item => getFilter(item.status).checked);
  };
</script>

<style>
.v-btn.v-btn--active {
  background: black;
  color: white;
}
.table-pagination li.v-pagination__item--is-active button{
  background: black;
  color: white;
}
</style>