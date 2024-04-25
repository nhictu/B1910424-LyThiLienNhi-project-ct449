<template>
    <div>
        <CModal :visible="isShowModal" @close="() => { isShowModal = false; clearData();}" aria-labelledby="StaffModal">
            <CModalHeader>
                <CModalTitle id="StaffModal">{{ isAddStaff ? 'Thêm nhân viên' : 'Cập nhật nhân viên' }} </CModalTitle>
            </CModalHeader>
            <CModalBody class="padding-reset">
                <CForm>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-barcode" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.MSNV" placeholder="Mã số nhân viên" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.HoTenNV" placeholder="Họ và tên" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.Chucvu" placeholder="Chức vụ" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.Diachi" placeholder="Địa chỉ" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-phone" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.SoDienThoai" placeholder="Số điện thoại" />
                    </CInputGroup>
                    <CInputGroup v-if="isAddStaff" class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.Password" type="password" placeholder="Password"
                            autocomplete="new-password" />
                    </CInputGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { clearData(); isShowModal = false;}">
                    Close
                </CButton>
                <CButton color="primary" @click="addOrUpdateStaff">{{ isAddStaff ? 'Thêm' : 'Cập nhật' }}</CButton>
            </CModalFooter>
        </CModal>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4 custom1">
                    <CRow>
                        <CCol :xs="4">
                            <CForm>
                                <CFormInput type="text" v-model="searchString" label="Mã số và họ tên nhân viên"
                                    placeholder="Staff12522 - Nguyễn Văn A" />
                            </CForm>
                        </CCol>
                        <CCol :xs="6" class="custom5">
                            <CButton color="primary" @click="() => {
                                isAddStaff = true
                                isShowModal = true
                            }">Add Staff</CButton>
                        </CCol>
                    </CRow>
                    <CCardHeader class="custom3"> Quantity: {{ numStaff }} </CCardHeader>
                    <CRow v-if="isLoading" class="loading-area">
                        <CSpinner />
                    </CRow>
                    <CRow v-else-if="dataStaff.length == 0" class="center-two-d">
                        <div>Không có dữ liệu</div>
                    </CRow>
                    <CCardBody class="custom2">
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead class="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        <CIcon name="cil-people" />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Mã số
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Họ tên
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Chức vụ
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Địa chỉ
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Điện thoại
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Thao tác
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="item in dataStaff" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <CAvatar size="md" :src="avatar" />
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.MSNV }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.HoTenNV }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.Chucvu }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.Diachi }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.SoDienThoai }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div class="d-flex center-two-d">
                                            <CButton @click="setUpdateStaff(item)" color="primary" role="button"
                                                class="update-button">
                                                <CIcon icon="cil-color-border" size="lg" />
                                            </CButton>
                                            <CButton @click="deleteStaff(item)" color="danger" role="button"
                                                class="delete-button">
                                                <CIcon icon="cil-delete" size="lg" />
                                            </CButton>
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" class="center-two-d2">
                        <CPaginationItem @click="previous" class="is-pointer-custom">Previous</CPaginationItem>
                        <CPaginationItem v-for="pageNumber in displayedPages" class="is-pointer-custom"
                            :key="pageNumber" @click="setCurrentPage(pageNumber)" :active="pageNumber == currentPage">
                            {{ pageNumber }}
                        </CPaginationItem>
                        <CPaginationItem @click="next" class="is-pointer-custom">Next</CPaginationItem>
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import avatar from '@/assets/images/avatars/staff.jpg'
import { staffService } from '../../services/index.js'

export default {
    name: 'Staff',
    data: () => {
        return {
            avatar: avatar,
            isLoading: true,
            isShowModal: false,
            isAddStaff: true,
            handleData: {},
            dataStaff: [],
            numStaff: 0,
            currentPage: 1,
            pageSize: 4,
            searchString: '',
        }
    },
    computed: {
        displayedPages() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numStaff / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        }
    },
    watch: {
        searchString: function () {
            this.getStaff()
        },
        currentPage: function () {
            this.getStaff()
        }
    },
    methods: {
        previous() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            this.currentPage = startPage - 1 >= 1 ? startPage - 1 : 1
        },
        next() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numStaff / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            this.currentPage = endPage + 1 <= numPage ? endPage + 1 : numPage == 0 ? 1 : numPage
        },
        setCurrentPage(page) {
            this.currentPage = page
        },
        async getStaff() {
            try {
                const data = await staffService.getStaff(this.currentPage, this.pageSize, this.searchString)
                if (data.code == 200) {
                    this.numStaff = data.totalCount
                    this.dataStaff = data.data
                    if(this.dataStaff.length == 0)
                        this.previous()
                }
                else {
                    this.$root.openToast('Lỗi server', data.message, 'danger')
                    this.numStaff = 0
                    this.dataStaff = []
                }
                this.isLoading = false
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async addOrUpdateStaff() {
            try {
                const data = this.isAddStaff ?
                    await staffService.addStaff(this.handleData) :
                    await staffService.updateStaff(this.handleData)

                if (data.code == 200) {
                    let title = this.isAddStaff ? 'Tạo nhân viên thành công' : 'Cập nhật nhân viên thành công'
                    let message = this.isAddStaff ? 'Bạn đã tạo nhân viên thành công!' : 'Bạn đã cập nhật nhân viên thành công!'
                    this.$root.openToast(title, message, 'success')
                    await this.getStaff()
                    this.clearData()
                }
                else {
                    if (data.errors)
                        data.errors.forEach((error, index) => this.$root.openToast('Lỗi nhập liệu', error.msg, 'danger'))
                    else
                        this.$root.openToast('Lỗi nhập liệu', data.message, 'danger')
                }
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async deleteStaff(item) {
            this.$root.openModal({
                title: 'Xác nhận xóa',
                message: `Bạn có muốn xóa nhân viên ${item.HoTenNV} ?`,
                onOk: async () => {
                    try {
                        const data = await staffService.deleteStaff(item)
                        if (data.code == 200) {
                            this.$root.openToast('Xóa thành công', 'Đã xóa nhân viên thành công', 'success')
                            await this.getStaff()
                        }
                        else
                            this.$root.openToast('Lỗi server', data.message, 'danger')
                    } catch (error) {
                        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
                    }
                }
            })
        },
        setUpdateStaff(item) {
            this.handleData = { ...item }
            this.isAddStaff = false
            this.isShowModal = true
        },
        clearData() {
            this.handleData = {}
            this.isAddStaff = true
            this.isShowModal = false
        }
    },
    created() {
        this.getStaff()
    },
}
</script>
