<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <!-- Heading -->
                <div class="d-flex justify-space-between pa-4">
                    <h1>Welcome to Tectalik's Employee Portal</h1>
                    <v-img :src="editForm.image" max-width="150" height="110"></v-img>
                    <v-btn icon size="20" class="position-fixed" style="right:172px;bottom:536px"
                        @click="triggerFileInput">
                        <v-icon size="14">add_a_photo</v-icon>
                    </v-btn>
                    <input type="file" ref="fileInput" @change="handleImageUpload" style="display: none;" />
                </div>

                <!-- Image section with edit button -->
                <!-- <div class="d-flex justify-center pa-4" style="position: relative;">
                    <v-img :src="editForm.image" max-width="150" height="110"></v-img>
                    <v-btn icon size="20" class="position-absolute" style="bottom: 20px;right:535px"
                        @click="triggerFileInput">
                        <v-icon size="14">add_a_photo</v-icon>
                    </v-btn>
                    <input type="file" ref="fileInput" @change="handleImageUpload" style="display: none;" />
                </div> -->
                <v-form v-model="valid" ref="formRef">
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="firstname" :rules="firstnameRules" placeholder="First Name"
                                variant="outlined" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="lastname" :rules="lastnameRules" placeholder="Last Name"
                                variant="outlined" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="email" :rules="emailRules" placeholder="Email" variant="outlined"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="username" :rules="usernameRules" placeholder="Username"
                                variant="outlined" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select variant="outlined" label="Gender" v-model="gender"
                                :items="['Male', 'Female', 'Prefer Not to say']"></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <!-- <v-date-input v-model="dob" variant="outlined" label="Date of Birth"
                                append-inner-icon=""></v-date-input> -->
                            <v-text-field v-model="dob" type="date" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select v-model="bloodGroup" variant="outlined" label="Blood Group"
                                :items="['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']"></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="phoneNumber" :rules="phoneRules" label="Phone Number"
                                variant="outlined" required></v-text-field>
                        </v-col>

                        <!-- Address Lines (Horizontal) -->
                        <template v-for="(line, index) in addressLines" :key="'address-' + index">
                            <v-col cols="12" md="3">
                                <div class="d-flex align-center">
                                    <v-text-field v-model="addressLines[index]" :label="`Address Line ${index + 1}`"
                                        variant="outlined" class="flex-grow-1" />
                                    <v-btn icon variant="text" class="ml-2"
                                        v-if="index === 0 && addressLines.length < 2" @click="addAddressLine">
                                        <v-icon size="20" style="margin-bottom: 20px;">add</v-icon>
                                    </v-btn>
                                    <v-btn icon variant="text" class="ml-2" v-if="index === 1"
                                        @click="removeAddressLine(index)">
                                        <v-icon size="20" style="margin-bottom: 20px;">delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </template>

                        <!-- <v-col cols="12" md="3">
                            <div v-for="(line, index) in addressLines" :key="index" class="mb-2">
                                <div class="d-flex align-center">
                                    <v-text-field v-model="addressLines[index]" :label="`Address Line ${index + 1}`"
                                        variant="outlined" class="flex-grow-1" />
                                    <v-btn icon variant="text" class="mb-4" v-if="index === 0 && addressLines.length < 2"
                                        @click="addAddressLine">
                                        <v-icon size="20">add</v-icon>
                                    </v-btn>
                                    <v-btn icon variant="text" class="mb-4" v-if="index === 1"
                                        @click="removeAddressLine(index)">
                                        <v-icon size="20">delete</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-col> -->
                        <v-col cols="12" md="3">
                            <v-select v-model="selectedState" :items="states" label="State" variant="outlined"
                                required></v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-select v-model="selectedCity" :items="cities" label="City" variant="outlined"
                                :disabled="!selectedState" required></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="nationality" :rules="nationalityRules" label="Nationality"
                                variant="outlined" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-select v-model="employmentType" variant="outlined" label="Employment Type"
                                :items="['Full-time', 'Part-time', 'Contract', 'Intern']"></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="aadhaarNumber" :rules="aadhaarRules" label="Aadhaar Number"
                                variant="outlined" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="panNumber" :rules="panRules" label="PAN Number" variant="outlined"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <div class="d-flex align-end justify-end">
                    <v-btn variant="outlined" color="green" @click="handleSubmit">Submit</v-btn>
                </div>
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'

const editForm = ref({
    image: new URL('../assets/image.png', import.meta.url).href,
})

const fileInput = ref(null)
function triggerFileInput() {
    fileInput.value?.click()
}

function handleImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
        const imageUrl = URL.createObjectURL(file)
        editForm.value.image = imageUrl
    }
}

// Separate reactive refs for form fields
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const username = ref('')
const gender = ref('')
const dob = ref(null)
const bloodGroup = ref('')
const phoneNumber = ref('')
const nationality = ref('')
const employmentType = ref('')
const aadhaarNumber = ref('')
const panNumber = ref('')

const firstnameRules = [
    v => !!v || 'First Name is Required',
    v => /[A-Za-z]+$/.test(v) || 'Only be letters'
]
const lastnameRules = [
    v => !!v || 'Last name is required',
    v => /[A-Za-z]+$/.test(v) || 'Only be letters'
]
const emailRules = [
    v => !!v || 'Email is required',
    v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Enter a valid email'
]
const usernameRules = [
    v => !!v || 'User name is required',
    v => /[A-Za-z0-9_]+$/.test(v) || 'Username should be alphanumeric'
]
const phoneRules = [
    v => !!v || 'Phone Number is requird',
    v => /^[6-9]\d{9}$/.test(v) || 'Enter a valid Phone Number'
]
const nationalityRules = [
    v => !!v || 'Nationality is required',
    v => /[A-Za-z\s]+$/.test(v) || 'Nationality must contain only letters'
]
const aadhaarRules = [
    v => !!v || 'Aadhaar Number is required',
    v => /^\d{12}$/.test(v) || 'Aadhaar Number must be exactly 12 digits'
]
const panRules = [
    v => !!v || 'Pan Number is required',
    v => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v) || 'Enter a valid Pan Number'
]


const addressLines = ref([''])

function addAddressLine() {
    if (addressLines.value.length < 2) {
        addressLines.value.push('')
    }
}

function removeAddressLine(index) {
    if (addressLines.value.length > 1) {
        addressLines.value.splice(index, 1)
    }
}

import statesData from '@/assets/combined.json'

const states = ref([])
const cities = ref([])
const selectedState = ref('')
const selectedCity = ref('')

onMounted(() => {
    // Access the array inside 'states' key
    states.value = statesData.states.map(state => state.name)
})

watch(selectedState, (newState) => {
    const state = statesData.states.find(s => s.name === newState)
    cities.value = state ? state.cities : []
    selectedCity.value = ''  // reset city when state changes
})

const formRef = ref(null)
const isUnique = ref(true)
const isPhoneUnique=ref(true)
const isAadhaarUnique=ref(true)
const isPanUnique=ref(true)
function checkUniqueness() {
    const existing = JSON.parse(localStorage.getItem('employees') || '[]')
    isPhoneUnique.value=!existing.some(emp=>emp.phoneNumber === phoneNumber.value)
    isAadhaarUnique.value=!existing.some(emp=>emp.aadhaarNumber === aadhaarNumber.value)
    isPanUnique.value=!existing.some(emp=>emp.panNumber === panNumber.value)

}
watch([phoneNumber, aadhaarNumber, panNumber], checkUniqueness)

async function handleSubmit() {
    const { valid: isFormValid } = await formRef.value?.validate()
    checkUniqueness()
    if (!isFormValid) {
        alert('Please fill out the form correctly')
        return
    }
    if(!isPhoneUnique.value || !isAadhaarUnique.value || !isPanUnique.value){
        let message='The following fields must be unique: \n'
        if(!isPhoneUnique.value)message+='-Phone number already exists\n'
        if(!isAadhaarUnique.value)message+='-Aadhaar number already exists\n'
        if(!isPanUnique.value)message+='-Pan number already exists\n'

        if(!isPhoneUnique.value && !isAadhaarUnique.value && !isPanUnique.value){
            message='Please fill unique values for Phone,Aadhaar, and PAN'
        }
        alert(message)
        return
    }
    
    const existing = JSON.parse(localStorage.getItem('employees') || '[]')
    let employeeId = parseInt(localStorage.getItem('employeeId') || '0', 10)
    employeeId += 1
    localStorage.setItem('employeeId', employeeId.toString())
    const newEmployee = {
        id: employeeId,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        username: username.value,
        gender: gender.value,
        dob: dob.value,
        bloodGroup: bloodGroup.value,
        phoneNumber: phoneNumber.value,
        addressLines: addressLines.value,
        selectedState: selectedState.value,
        selectedCity: selectedCity.value,
        nationality: nationality.value,
        employmentType: employmentType.value,
        aadhaarNumber: aadhaarNumber.value,
        panNumber: panNumber.value,
        image: editForm.value.image,
        isActive: true,
    }
    existing.push(newEmployee)
    localStorage.setItem('employees', JSON.stringify(existing))
    alert('Employee Data saved')
}

</script>
