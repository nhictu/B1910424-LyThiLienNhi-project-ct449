<template>
    <div>
        <CModal :visible="isShowModal" @close="() => { isShowModal = false; clearData(); }"
            aria-labelledby="bookCardModal">
            <CModalHeader>
                <CModalTitle id="bookCardModal">{{ isAddBookCard ? 'Thêm phiếu mượn' : 'Cập nhật phiếu mượn' }}</CModalTitle>
            </CModalHeader>
            <CModalBody class="padding-reset">
                <CForm>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-building" />
                        </CInputGroupText>
                        <CFormSelect aria-label="Default select example" v-model="handleData.MaDocGia"
                            :class="{ 'custom9': handleData.MaDocGia == '', 'custom10': handleData.MaDocGia != '' }">
                            <option value="">Chọn đọc giả</option>
                            <option v-for="(reader, index) in readerList" :key="index" :value="reader._id">
                                {{ reader.HoLot + ' ' + reader.Ten }}
                            </option>
                        </CFormSelect>
                    </CInputGroup>

                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-building" />
                        </CInputGroupText>
                        <CFormSelect aria-label="Default select example" v-model="handleData.MaSach"
                            :class="{ 'custom9': handleData.MaSach == '', 'custom10': handleData.MaSach != '' }">
                            <option value="">Chọn tên sách</option>
                            <option v-for="(book, index) in bookList" :key="index" :value="book._id">
                                {{ book.TenSach }}
                            </option>
                        </CFormSelect>
                    </CInputGroup>

                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-calendar" />
                        </CInputGroupText>
                        <div class="custom7">
                            <VueDatePicker v-model="tempNgayMuon" placeholder="Ngày mượn" :format="formatNgayMuon">
                                <template #input-icon>
                                </template>
                            </VueDatePicker>
                        </div>
                    </CInputGroup>

                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-calendar" />
                        </CInputGroupText>
                        <div class="custom7">
                            <VueDatePicker v-model="tempNgayTra" placeholder="Ngày trả" :format="formatNgayTra">
                                <template #input-icon>
                                </template>
                            </VueDatePicker>
                        </div>
                    </CInputGroup>

                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { isShowModal = false; clearData();  }">
                    Close
                </CButton>
                <CButton color="primary" @click="addOrUpdateBookCard">{{ isAddBookCard ? 'Thêm' : 'Cập nhật'}}</CButton>
            </CModalFooter>
        </CModal>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4 custom1">
                    <CRow>
                        <CCol :xs="4">
                            <CForm>
                                <CFormInput type="text" v-model="searchString"
                                    label="Tên sách, tên người mượn" placeholder="Đắc nhân tâm, Tiên,..." />
                            </CForm>
                        </CCol>
                        <CCol :xs="6" class="custom5">
                            <CButton color="primary" @click="() => { isShowModal = true }">Add BookCard</CButton>
                        </CCol>
                    </CRow>
                    <CCardHeader class="custom3"> Quantity: {{ numBookCard }} </CCardHeader>
                    <CRow v-if="isLoading" class="loading-area">
                        <CSpinner />
                    </CRow>
                    <CRow v-else-if="dataBookCard.length == 0" class="center-two-d ">
                        <div>Không có dữ liệu</div>
                    </CRow>
                    <CCardBody class="custom2">
                        <CTable align="middle" class="mb-0 border" hover responsive>
                            <CTableHead class="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Mã số
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Họ tên người mượn
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Tên sách
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Ngày mượn
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Ngày trả
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Thao tác
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="item in dataBookCard" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <div>{{ item._id }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.readerInfo[0].HoLot + ' ' + item.readerInfo[0].Ten }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.bookInfo[0].TenSach }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.NgayMuon }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.NgayTra }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div class="d-flex center-two-d">
                                            <CButton @click="setUpdateBookCard(item)" color="primary" role="button"
                                                class="update-button">
                                                <CIcon icon="cil-color-border" size="lg" />
                                            </CButton>
                                            <CButton @click="deleteBookCard(item)" color="danger" role="button"
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
                            :key="pageNumber" @click="setPage(pageNumber)" :active="pageNumber == currentPage">{{
                                pageNumber }}</CPaginationItem>
                        <CPaginationItem @click="next" class="is-pointer-custom">Next</CPaginationItem>
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import { bookCardService, bookService, readerService } from '../../services/index.js'

export default {
    name: 'BookCard',
    components: {
    },
    data: () => {
        return {
            isLoading: true,
            isShowModal: false,
            isAddBookCard: true,
            handleData: {},
            dataBookCard: [],
            bookList: [],
            readerList: [],
            numBookCard: 0,
            currentPage: 1,
            pageSize: 4,
            searchString: '',
            tempNgayTra: '',
            tempNgayMuon: '',
            apiUrl: process.env.API_URL,
        }
    },
    computed: {
        displayedPages() {
            let currentStage = Math.ceil(this.currentPage / this.pageSize)
            let startPage = (currentStage - 1) * this.pageSize + 1
            let endPage = currentStage * this.pageSize
            let numPage = Math.ceil(this.numBookCard / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        }
    },
    watch: {
        searchString: function (val) {
            this.getBookCard()
        },
        currentPage: function (val) {
            this.getBookCard()
        }
    },
    methods: {
        formatNgayMuon(date) {
            let day = date.getDate()
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month
            if (day < 10)
                day = '0' + day
            let year = date.getFullYear()
            this.handleData.NgayMuon = `${day}/${month}/${year}`
            return `${day}/${month}/${year}`
        },
        formatNgayTra(date) {
            let day = date.getDate()
            let month = date.getMonth() + 1
            if (month < 10)
                month = '0' + month
            if (day < 10)
                day = '0' + day
            let year = date.getFullYear()
            this.handleData.NgayTra = `${day}/${month}/${year}`
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
            let numPage = Math.ceil(this.numBookCard / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            this.currentPage = endPage + 1 <= numPage ? endPage + 1 : numPage == 0 ? 1 : numPage
        },
        setPage(number) {
            this.currentPage = number
        },
        async getBookCard() {
            try {
                const data = await bookCardService.getBookCard(this.currentPage, this.pageSize, this.searchString)
                if (data.code == 200) {
                    this.numBookCard = data.totalCount
                    this.dataBookCard = data.data
                    if(this.dataBookCard.length == 0)
                        this.previous()
                }
                else {
                    this.$root.openToast('Lỗi server', data.message, 'danger')
                    this.numBookCard = 0
                    this.dataBookCard = []
                }
                this.isLoading = false
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }

        },
        async getReader() {
            try {
                const data = await readerService.getReader(1, 1000, '')
                if (data.code == 200)
                    this.readerList = data.data
                else
                    this.$root.openToast('Lỗi server', data.message, 'danger')
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async getBook() {
            try {
                const data = await bookService.getBook(1, 1000, '')
                if (data.code == 200)
                    this.bookList = data.data
                else
                    this.$root.openToast('Lỗi server', data.message, 'danger')
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },  
        async addOrUpdateBookCard() {
            try {
                const data = this.isAddBookCard ?
                    await bookCardService.addBookCard(this.handleData) :
                    await bookCardService.updateBookCard(this.handleData)
                if (data.code == 200) {
                    let title = this.isAddBookCard ? 'Tạo đọc giả thành công' : 'Cập nhật đọc giả thành công'
                    let message = this.isAddBookCard ? 'Bạn đã tạo đọc giả thành công!' : 'Bạn đã cập nhật đọc giả thành công!'
                    this.$root.openToast(title, message, 'success')
                    await this.getBookCard()
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
        async deleteBookCard(item) {
            this.$root.openModal({
                title: 'Xác nhận xóa',
                message: 'Bạn có thật sự muốn xóa phiếu mượn?',
                onOk: async () => {
                    try {
                        const data = await bookCardService.deleteBookCard(item)
                        if (data.code == 200) {
                            this.$root.openToast('Xóa thành công', 'Đã xóa phiếu mượn thành công', 'success')
                            await this.getBookCard()
                        }
                        else {
                            this.$root.openToast('Lỗi server', data.message, 'danger')
                        }
                    } catch (error) {
                        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
                    }
                }
            })
        },
        setUpdateBookCard(item) {
            this.tempNgayMuon = this.convertStringToDate(item.NgayMuon)
            this.tempNgayTra = this.convertStringToDate(item.NgayTra)
            this.handleData = { ...item }
            this.isAddBookCard = false
            this.isShowModal = true
        },
        clearData() {
            this.handleData = {}
            this.tempNgayMuon = ''
            this.tempNgayTra = ''
            this.isAddBookCard = true
            this.isShowModal = false
        }
    },
    created() {
        this.getBookCard()
        this.getBook()
        this.getReader()
    },
}
</script>
