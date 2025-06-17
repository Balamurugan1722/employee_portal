<template>
  <v-container>
    <!-- Tabs -->
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab value="active">Active</v-tab>
      <v-tab value="inactive">Inactive</v-tab>
    </v-tabs>

    <!-- Tabbed Employee Tables -->
    <v-window v-model="tab">
      <!-- Active Employees Table -->
      <v-window-item value="active">
        <v-data-table
          :headers="headers"
          :items="activeEmployees"
          class="elevation-1 mt-4"
        >
          <template v-slot:item.sn="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.action="{ item }">
            <v-btn color="error" @click="confirmStatusChange(item, false)" icon size="32">
              <v-icon size="16">block</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div>
          <v-btn variant="outlined" class="mt-2" @click="$router.back()">Back</v-btn>
        </div>
      </v-window-item>

      <!-- Inactive Employees Table -->
      <v-window-item value="inactive">
        <v-data-table
          :headers="headers"
          :items="inactiveEmployees"
          class="elevation-1 mt-4"
        >
          <template v-slot:item.sn="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.action="{ item }">
            <v-btn color="success" @click="confirmStatusChange(item, true)" icon size="32">
              <v-icon size="16">check</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div>
          <v-btn variant="outlined" class="mt-2" @click="$router.back()">Back</v-btn>
        </div>
      </v-window-item>
    </v-window>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          Confirm Status Change
        </v-card-title>
        <v-card-text>
          Are you sure you want to
          <strong>{{ statusToSet ? 'activate' : 'deactivate' }}</strong>
          employee <strong>{{ selectedEmployee?.name }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="applyStatusChange">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: "active",
      employees: [],
      confirmDialog: false,
      selectedEmployee: null,
      statusToSet: null, // true for activate, false for deactivate
      headers: [
        { title: "S.No", key: "sn", align: "center", sortable: false },
        { title: "Name", key: "name", align: "center" },
        { title: "Email", key: "email", align: "center" },
        { title: "Username", key: "username", align: "center" },
        { title: "Phone Number", key: "phoneNumber", align: "center" },
        { title: "Action", key: "action", align: "center", sortable: false },
      ],
    };
  },
  computed: {
    activeEmployees() {
      return this.employees.filter((e) => e.active === true);
    },
    inactiveEmployees() {
      return this.employees.filter((e) => e.active !== true);
    },
  },
  methods: {
    confirmStatusChange(emp, newStatus) {
      this.selectedEmployee = emp;
      this.statusToSet = newStatus;
      this.confirmDialog = true;
    },
    applyStatusChange() {
      const index = this.employees.findIndex(
        (e) => e.email === this.selectedEmployee.email
      );
      if (index !== -1) {
        this.employees[index].active = this.statusToSet;
        this.saveToLocal();
      }
      this.confirmDialog = false;
    },
    saveToLocal() {
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
    loadFromLocal() {
      const data = localStorage.getItem("employees");
      this.employees = data
        ? JSON.parse(data).map((emp) => ({
            ...emp,
            name: `${emp.firstname} ${emp.lastname}`,
            active: emp.active !== undefined ? emp.active : true,
          }))
        : [];
    },
  },
  mounted() {
    this.loadFromLocal();
  },
};
</script>
