<template>
    <div>
        <CModal :visible="isShowModal" @close="() => { isShowModal = false; clearData(); }"
            aria-labelledby="bookModal">
            <CModalHeader>
                <CModalTitle id="bookModal">{{ isAddBook ? 'Thêm sách' : 'Cập nhật sách' }}</CModalTitle>
            </CModalHeader>
            <CModalBody class="padding-reset">
                <CForm>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-barcode" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.MaSach" placeholder="Mã số sách"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CFormInput type="file" ref="addImage" @change="onAddImageChage" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-book" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.TenSach" placeholder="Tên sách"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-money" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.DonGia" placeholder="Đơn giá"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-short-text" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.SoQuyen" placeholder="Số quyển"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-calendar" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.NamXuatBan" placeholder="Năm xuất bản"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-building" />
                        </CInputGroupText>
                        <CFormSelect aria-label="Default select example" v-model="handleData.MaNXB"
                            :class="{ 'custom9': handleData.MaNXB == '', 'custom10': handleData.MaNXB != '' }">
                            <option value="">Chọn nhà xuất bản</option>
                            <option v-for="(publisher, index) in publisherList" :key="index" :value="publisher._id">
                                {{ publisher.TenNXB }}
                            </option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.TenTacGia" placeholder="Tên tác giả" autocomplete="Tên tác giả" />
                    </CInputGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { isShowModal = false; clearData(); }">
                    Close
                </CButton>
                <CButton color="primary" @click="addOrUpdateBook">{{ isAddBook ? 'Thêm' : 'Cập nhật' }}</CButton>
            </CModalFooter>
        </CModal>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4 custom1">
                    <CRow>
                        <CCol :xs="4">
                            <CForm>
                                <CFormInput type="text" v-model="searchString"
                                    label="Mã số và tên sách" placeholder="Book12522 - Đắc nhân tâm"/>
                            </CForm>
                        </CCol>
                        <CCol :xs="6" class="custom5">
                            <CButton color="primary" @click="() => { isShowModal = true }">Add Book</CButton>
                        </CCol>
                    </CRow>
                    <CCardHeader class="custom3"> Quantity: {{ numBook }} </CCardHeader>
                    <CRow v-if="isLoading" class="loading-area">
                        <CSpinner />
                    </CRow>
                    <CRow v-else-if="dataBook.length == 0" class="center-two-d ">
                        <div>Không có dữ liệu</div>
                    </CRow>
                    <CCardBody class="custom2">
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead class="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        <CIcon name="cil-image" />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Mã số
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Tên sách
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Đơn giá (VNĐ)
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Số lượng
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Năm xuất bản
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Nhà xuất bản
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Tên tác giả
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Thao tác
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="item in dataBook" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <CImage fluid :src="apiUrl + '/public/' + item.TenAnh" width="100"
                                            height="100" />
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.MaSach }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.TenSach }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.DonGia }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.SoQuyen }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.NamXuatBan }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.publisherInfo[0].TenNXB }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.TenTacGia }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div class="d-flex center-two-d">
                                            <CButton @click="setUpdateBook(item)" color="primary" role="button"
                                                class="update-button">
                                                <CIcon icon="cil-color-border" size="lg" />
                                            </CButton>
                                            <CButton @click="deleteBook(item)" color="danger" role="button"
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
import { bookService, publisherService } from '../../services/index.js'

export default {
    name: 'Book',
    data: () => {
        return {
            isLoading: true,
            isShowModal: false,
            isAddBook: true,
            handleData: {},
            dataBook: [],
            publisherList: [],
            addImage: false,
            apiUrl: process.env.API_URL,
            numBook: 0,
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
            let numPage = Math.ceil(this.numBook / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        }
    },
    watch: {
        searchString: function () {
            this.getBook()
        },
        currentPage: function () {
            this.getBook()
        },
    },
    methods: {
        onAddImageChage(event) {
            if (event.target.files && event.target.files[0]) {
                this.addImage = event.target.files[0]
            }
        },
        async uploadAddImage() {
            if (this.addImage){
                const formdata = new FormData()
                formdata.append('image', this.addImage)
                try {
                    const data = await bookService.uploadFile(formdata)
                    if (data.code == 200 && data.fileName)
                        this.handleData.TenAnh = data.fileName
                    else
                        this.$root.openToast('Lỗi server', data.message, 'danger')
                } catch (error) {
                    this.$root.openToast('Lỗi server', 'Không kết nối được với server', 'danger')
                }
            }
        },
        previous() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            this.currentPage = startPage - 1 >= 1 ? startPage - 1 : 1
        },
        next() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numBook / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            this.currentPage = endPage + 1 <= numPage ? endPage + 1 : numPage == 0 ? 1 : numPage
        },
        setCurrentPage(page) {
            this.currentPage = page
        },
        async getBook() {
            try {
                const data = await bookService.getBook(this.currentPage, this.pageSize, this.searchString)
                if (data.code == 200) {
                    this.numBook = data.totalCount
                    this.dataBook = data.data
                    if(this.dataBook.length == 0)
                        this.previous()
                }
                else {
                    this.$root.openToast('Lỗi server', data.message, 'danger')
                    this.numBook = 0
                    this.dataBook = []
                }
                this.isLoading = false
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async getPublisher() {
            try {
                const data = await publisherService.getPublisher(1, 1000, '')
                if (data.code == 200)
                    this.publisherList = data.data
                else
                    this.$root.openToast('Lỗi server', data.message, 'danger')
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async addOrUpdateBook() {
            await this.uploadAddImage()
            try {
                const data = this.isAddBook ? 
                    await bookService.addBook(this.handleData) :
                    await bookService.updateBook(this.handleData)
                if (data.code == 200) {
                    let title = this.isAddBook ? 'Tạo sách thành công' : 'Cập nhật sách thành công'
                    let message = this.isAddBook ? 'Bạn đã tạo sách thành công!' : 'Bạn đã cập nhật sách thành công!'
                    this.$root.openToast(title, message, 'success')
                    await this.getBook()
                    this.clearData()
                }
                else {
                    if (data.errors) {
                        data.errors.forEach((error, index) => {
                            this.$root.openToast('Lỗi nhập liệu', error.msg, 'danger')
                        })
                    } else
                        this.$root.openToast('Lỗi nhập liệu', data.message, 'danger')
                }
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async deleteBook(item) {
            this.$root.openModal({
                title: 'Xác nhận xóa',
                message: `Bạn có thật sự muốn xóa sachs ${item.TenSach}? Việc xóa sách này sẽ xóa các phiếu mượn sách có liên quan!`,
                onOk: async () => {
                    try {
                        const data = await bookService.deleteBook(item)
                        if (data.code == 200) {
                            this.$root.openToast('Xóa thành công', 'Đã xóa sách thành công', 'success')
                            await this.getBook()
                        }
                        else 
                            this.$root.openToast('Lỗi server', data.message, 'danger')
                    } catch (error) {
                        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
                    }
                }
            })
        },
        setUpdateBook(item) {
            this.handleData = { ...item }
            this.isAddBook = false
            this.isShowModal = true
            this.addImage = false
            this.updateImage = {}
        },
        clearData() {
            this.handleData = {}
            this.isAddBook = true
            this.isShowModal = false
            this.addImage = false
        }
    },
    created() {
        this.getBook()
        this.getPublisher()
    },
}
</script>
