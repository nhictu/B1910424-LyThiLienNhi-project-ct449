<template>
    <div>
        <CModal :visible="isShowModal" @close="() => { isShowModal = false; clearData() }"
            aria-labelledby="readerModal">
            <CModalHeader>
                <CModalTitle id="readerModal">{{ isAddReader ? 'Thêm đọc giả' : 'Cập nhật đọc giả' }}</CModalTitle>
            </CModalHeader>
            <CModalBody class="padding-reset">
                <CForm>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-barcode" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.MaDocGia" placeholder="Mã số đọc giả" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.HoLot" placeholder="Họ lót" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.Ten" placeholder="Tên" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-birthday-cake" />
                        </CInputGroupText>
                        <div class="custom7">
                            <VueDatePicker v-model="tempDate" placeholder="Ngày sinh" :format="format">
                                <template #input-icon>
                                </template>
                            </VueDatePicker>
                        </div>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-group" />
                        </CInputGroupText>
                        <CFormSelect aria-label="Default select example" v-model="handleData.Phai"
                            :class="{ 'custom9': handleData.Phai == '', 'custom10': handleData.Phai != '' }">
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.DiaChi" placeholder="Địa chỉ" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-phone" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.DienThoai" placeholder="Số điện thoại"
                            autocomplete="Số điện thoại" />
                    </CInputGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { isShowModal = false; clearData(); }">
                    Close
                </CButton>
                <CButton color="primary" @click="addOrUpdateReader">{{ isAddReader ? 'Thêm' : 'Cập nhật' }}</CButton>
            </CModalFooter>
        </CModal>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4 custom1">
                    <CRow>
                        <CCol :xs="4">
                            <CForm>
                                <CFormInput type="text" v-model="searchString" label="Mã số và họ tên đọc giả"
                                    placeholder="Reader12522 - Nguyễn Văn A" />
                            </CForm>
                        </CCol>
                        <CCol :xs="6" class="custom5">
                            <CButton color="primary" @click="() => { isShowModal = true }">Add Reader</CButton>
                        </CCol>
                    </CRow>
                    <CCardHeader class="custom3"> Quantity: {{ numReader }} </CCardHeader>
                    <CRow v-if="isLoading" class="loading-area">
                        <CSpinner />
                    </CRow>
                    <CRow v-else-if="dataReader.length == 0" class="center-two-d">
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
                                        Ngày sinh
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Giới tính
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
                                <CTableRow v-for="item in dataReader" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <CAvatar size="md" :src="avatar" />
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.MaDocGia }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.HoLot + ' ' + item.Ten }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.NgaySinh }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.Phai }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.DiaChi }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.DienThoai }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div class="d-flex center-two-d">
                                            <CButton @click="setUpdateReader(item)" color="primary" role="button"
                                                class="update-button">
                                                <CIcon icon="cil-color-border" size="lg" />
                                            </CButton>
                                            <CButton @click="deleteReader(item)" color="danger" role="button"
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
                            :key="pageNumber" @click="setCurrentPage(pageNumber)" :active="pageNumber == currentPage">{{
                                pageNumber }}</CPaginationItem>
                        <CPaginationItem @click="next" class="is-pointer-custom">Next</CPaginationItem>
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import avatar from '@/assets/images/avatars/staff.jpg'
import { readerService } from '../../services/index.js'

export default {
    name: 'Reader',
    data: () => {
        return {
            avatar: avatar,
            isLoading: true,
            isShowModal: false,
            isAddReader: true,
            handleData: {},
            dataReader: [],
            numReader: 0,
            currentPage: 1,
            pageSize: 4,
            searchString: '',
            tempDate: ''
        }
    },
    computed: {
        displayedPages() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numReader / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        }
    },
    watch: {
        searchString: function () {
            this.getReader()
        },
        currentPage: function () {
            this.getReader()
        },
    },
    methods: {
        format(date) {
            let day = date.getDate()
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month
            if (day < 10)
                day = '0' + day
            let year = date.getFullYear()
            this.handleData.NgaySinh = `${day}/${month}/${year}`
            return `${day}/${month}/${year}`
        },
        convertStringToDate(dateString) {
            if (typeof dateString == 'string' && dateString.trim() != '') {
                const parts = dateString.split('/')
                const day = parseInt(parts[0], 10)
                const month = parseInt(parts[1], 10) - 1
                const year = parseInt(parts[2], 10)
                return new Date(year, month, day)
            }
            return ''
        },
        previous() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            this.currentPage = startPage - 1 >= 1 ? startPage - 1 : 1
        },
        next() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numReader / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            this.currentPage = endPage + 1 <= numPage ? endPage + 1 : numPage == 0 ? 1 : numPage
        },
        setCurrentPage(page) {
            this.currentPage = page
        },
        async getReader() {
            try {
                const data = await readerService.getReader(this.currentPage, this.pageSize, this.searchString)
                if (data.code == 200) {
                    this.numReader = data.totalCount
                    this.dataReader = data.data
                    if(this.dataReader.length == 0)
                        this.previous()
                }
                else {
                    this.$root.openToast('Lỗi server', data.message, 'danger')
                    this.numReader = 0
                    this.dataReader = []
                }
                this.isLoading = false
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }

        },
        async addOrUpdateReader() {
            try {
                const data = this.isAddReader ?
                    await readerService.addReader(this.handleData) :
                    await readerService.updateReader(this.handleData)
                if (data.code == 200) {
                    let title = this.isAddReader ? 'Tạo đọc giả thành công' : 'Cập nhật đọc giả thành công'
                    let message = this.isAddReader ? 'Bạn đã tạo đọc giả thành công!' : 'Bạn đã cập nhật đọc giả thành công!'
                    this.$root.openToast(title, message, 'success')
                    await this.getReader()
                    this.clearData()
                }
                else {
                    if (data.errors)
                        data.errors.forEach((error, index) =>
                            this.$root.openToast('Lỗi nhập liệu', error.msg, 'danger'))
                    else
                        this.$root.openToast('Lỗi nhập liệu', data.message, 'danger')
                }
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async deleteReader(item) {
            this.$root.openModal({
                title: 'Xác nhận xóa',
                message: `Bạn có thật sự muốn xóa đọc giả ${item.HoLot} ${item.Ten}? Việc xóa đọc giả này sẽ xóa các thông tin phiếu mượn có liên quan`,
                onOk: async () => {
                    try {
                        const data = await readerService.deleteReader(item)
                        if (data.code == 200) {
                            this.$root.openToast('Xóa thành công', 'Đã xóa đọc giả thành công', 'success')
                            await this.getReader()
                        }
                        else
                            this.$root.openToast('Lỗi server', data.message, 'danger')
                    } catch (error) {
                        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
                    }
                }
            })
        },
        setUpdateReader(item) {
            this.tempDate = this.convertStringToDate(item.NgaySinh)
            this.handleData = { ...item }
            this.isAddReader = false
            this.isShowModal = true
        },
        clearData() {
            this.handleData = {}
            this.tempDate = ''
            this.isAddReader = true
            this.isShowModal = false
        }
    },
    created() {
        this.getReader()
    },
}
</script>
