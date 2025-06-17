<template>
  <v-container>
    <v-data-table :headers="headers" :items="employees" item-value="id" class="elevation-1">
      <!-- S.No -->
      <template v-slot:item.sn="{ index }">
        {{ index + 1 }}
      </template>

      <!-- Actions -->
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="viewEmployee(item)" variant="text">
          <v-icon>visibility</v-icon>
        </v-btn>
        <v-btn icon @click="editEmployee(item)" variant="text">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon @click="promptDeleteEmployee(item.id)" variant="text">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>

      <!-- Status Chip -->
      <template v-slot:item.active="{ item }">
        <v-chip :color="item.active ? 'green' : 'red'" dark>
          {{ item.active ? 'Active' : 'Inactive' }}
        </v-chip>
      </template>
    </v-data-table>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-space-between">
      <v-btn @click="$router.push('/employee-status')" class="mt-4">Go to Employee Status</v-btn>
      <v-btn @click="$router.back()" class="mt-4">Back</v-btn>
    </div>

    <!-- View Dialog -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Employee Details</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-img
                :src="selectedEmployee.image || placeholderImage"
                max-width="150"
                height="110"
                class="rounded"
              />
            </v-list-item>
            <v-list-item v-for="(label, key) in employeeFields" :key="key">
              <v-list-item-title>{{ label }}: {{ selectedEmployee[key] || '-' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="viewDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">Edit Employee</v-card-title>
        <v-card-text>
          <v-form ref="editFormRef" v-model="editFormValid">
            <!-- Image Preview -->
            <div class="position-relative d-flex justify-center my-2">
              <v-img
                :src="editEmployeeData.image || placeholderImage"
                max-width="150"
                height="110"
                class="rounded"
              />
              <v-icon
                color="blue"
                size="24"
                class="position-absolute"
                style="top: 72px; right: 50px; cursor: pointer; background: white; border-radius: 50%; padding: 4px;"
                @click="triggerImageUpload"
              >
                camera
              </v-icon>
            </div>
            <input
              type="file"
              ref="imageInputRef"
              accept="image/*"
              style="display: none"
              @change="onEditImageChange"
            />

            <!-- Editable Fields -->
            <v-text-field
              v-for="(label, key) in employeeFields"
              :key="key"
              v-model="editEmployeeData[key]"
              :label="label"
              variant="outlined"
              :required="key === 'firstname' || key === 'lastname' || key === 'email'"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cancelEdit">Cancel</v-btn>
          <v-btn text @click="updateEmployee">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="confirmDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this employee?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirmDeleteDialog = false">No</v-btn>
          <v-btn color="red" text @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="2500" color="success">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const placeholderImage = 'https://via.placeholder.com/150';

const headers = [
  { title: 'S.No', key: 'sn', align: 'center', sortable: false },
  { title: 'Actions', key: 'actions', align: 'center', sortable: false },
  { title: 'Name', key: 'name', align: 'center' },
  { title: 'Mail-ID', key: 'email', align: 'center' },
  { title: 'Username', key: 'username', align: 'center' },
  { title: 'Mobile Number', key: 'phoneNumber', align: 'center' },
  { title: 'Status', key: 'active', align: 'center' },
];

const employeeFields = {
  firstname: 'First Name',
  lastname: 'Last Name',
  gender: 'Gender',
  dob: 'Date of Birth',
  email: 'Email',
  username: 'Username',
  phoneNumber: 'Phone Number',
  employmentType: 'Employment Type',
  nationality: 'Nationality',
  selectedState: 'State',
  selectedCity: 'City',
};

const employees = ref([]);
const viewDialog = ref(false);
const editDialog = ref(false);
const confirmDeleteDialog = ref(false);
const selectedEmployee = ref({});
const editEmployeeData = reactive({});
const previousEmployeeData = ref({});
const editFormRef = ref(null);
const editFormValid = ref(false);
const imageInputRef = ref(null);
const route = useRoute();
const employeeIdToDelete = ref(null);

// Snackbar
const snackbar = ref(false);
const snackbarText = ref('');

onMounted(() => {
  loadEmployees();
});

watch(() => route.fullPath, loadEmployees);

function loadEmployees() {
  const data = JSON.parse(localStorage.getItem('employees') || '[]');
  employees.value = data.map(emp => ({
    ...emp,
    name: `${emp.firstname} ${emp.lastname}`,
    image: emp.image || placeholderImage,
    active: emp.active !== undefined ? emp.active : true,
  }));
}

function viewEmployee(employee) {
  selectedEmployee.value = {
    ...employee,
    image: employee.image || placeholderImage,
  };
  viewDialog.value = true;
}

function editEmployee(employee) {
  Object.assign(editEmployeeData, JSON.parse(JSON.stringify(employee)));
  previousEmployeeData.value = JSON.parse(JSON.stringify(employee));
  if (!editEmployeeData.image) {
    editEmployeeData.image = placeholderImage;
  }
  editDialog.value = true;
}

function cancelEdit() {
  editDialog.value = false;
  resetEditDialog();
}

function triggerImageUpload() {
  imageInputRef.value?.click();
}

function onEditImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        editEmployeeData.image = e.target.result;
      }
      event.target.value = ''; // reset to allow same image selection again
    };
    reader.readAsDataURL(file);
  }
}

function showSnackbar(message) {
  snackbarText.value = message;
  snackbar.value = true;
}

async function updateEmployee() {
  const result = await editFormRef.value?.validate();
  if (result.valid) {
    const index = employees.value.findIndex(emp => emp.id === editEmployeeData.id);
    if (index !== -1) {
      const original = previousEmployeeData.value;
      const updated = editEmployeeData;
      const changedFields = [];

      Object.keys(employeeFields).forEach(key => {
        if (original[key] !== updated[key]) {
          changedFields.push(employeeFields[key]);
        }
      });

      if ((original.image || '') !== (updated.image || '')) {
        changedFields.push('Image');
      }

      employees.value[index] = {
        ...updated,
        name: `${updated.firstname} ${updated.lastname}`,
        image: updated.image || placeholderImage,
      };
      localStorage.setItem('employees', JSON.stringify(employees.value));

      if (selectedEmployee.value.id === updated.id) {
        selectedEmployee.value = { ...updated };
      }

      if (changedFields.length > 0) {
        changedFields.forEach((field, i) => {
          setTimeout(() => showSnackbar(`${field} updated successfully.`), i * 1500);
        });
      } else {
        showSnackbar('No changes made.');
      }

      editDialog.value = false;
      resetEditDialog();
    }
  }
}

function resetEditDialog() {
  for (const key in editEmployeeData) {
    delete editEmployeeData[key];
  }
}

function promptDeleteEmployee(id) {
  employeeIdToDelete.value = id;
  confirmDeleteDialog.value = true;
}

function confirmDelete() {
  employees.value = employees.value.filter(emp => emp.id !== employeeIdToDelete.value);
  localStorage.setItem('employees', JSON.stringify(employees.value));
  confirmDeleteDialog.value = false;
  showSnackbar('Employee deleted successfully.');
}
</script>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style>
