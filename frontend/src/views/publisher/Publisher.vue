<template>
    <div>
        <CModal :visible="isShowModal" @close="() => { isShowModal = false; clearData(); }" aria-labelledby="publisherModal">
            <CModalHeader>
                <CModalTitle id="publisherModal">{{ isAddPublisher ? 'Thêm nhà xuất bản' : 'Cập nhật nhà xuất bản' }}</CModalTitle>
            </CModalHeader>
            <CModalBody class="padding-reset">
                <CForm>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-barcode" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.MaNXB" placeholder="Mã số nhà xuất bản"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-user" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.TenNXB" placeholder="Tên nhà xuất bản"/>
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                        <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                        </CInputGroupText>
                        <CFormInput v-model="handleData.DiaChi" placeholder="Địa chỉ" autocomplete="Địa chỉ" />
                    </CInputGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { isShowModal = false; clearData(); }">
                    Close
                </CButton>
                <CButton color="primary" @click="addOrUpdatePublisher">{{ isAddPublisher ? 'Thêm' : 'Cập nhật' }}</CButton>
            </CModalFooter>
        </CModal>
        <CRow>
            <CCol :md="12">
                <CCard class="mb-4 custom1">
                    <CRow>
                        <CCol :xs="4">
                            <CForm>
                                <CFormInput type="text" v-model="searchString"
                                    label="Mã số và tên nhà xuất bản" placeholder="Publisher12522 - TXB kim đồng"/>
                            </CForm>
                        </CCol>
                        <CCol :xs="6" class="custom5">
                            <CButton color="primary" @click="() => { isShowModal = true }">Add Publisher</CButton>
                        </CCol>
                    </CRow>
                    <CCardHeader class="custom3"> Quantity: {{ numPublisher }} </CCardHeader>
                    <CRow v-if="isLoading" class="loading-area">
                        <CSpinner />
                    </CRow>
                    <CRow v-else-if="dataPublisher.length == 0" class="center-two-d ">
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
                                        Tên nhà xuất bản
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Địa chỉ
                                    </CTableHeaderCell>
                                    <CTableHeaderCell class="bg-body-secondary text-center">
                                        Thao tác
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="item in dataPublisher" :key="item.name">
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.MaNXB }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.TenNXB }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div>{{ item.DiaChi }}</div>
                                    </CTableDataCell>
                                    <CTableDataCell class="text-center">
                                        <div class="d-flex center-two-d">
                                            <CButton @click="setUpdatePublisher(item)" color="primary" role="button"
                                                class="update-button">
                                                <CIcon icon="cil-color-border" size="lg" />
                                            </CButton>
                                            <CButton @click="deletePublisher(item)" color="danger" role="button"
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
import { publisherService } from '../../services/index.js'

export default {
    name: 'Publisher',
    data: () => {
        return {
            isLoading: true,
            isShowModal: false,
            isAddPublisher: true,
            handleData: {},
            dataPublisher: [],
            numPublisher: 0,
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
            let numPage = Math.ceil(this.numPublisher / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
        }
    },
    watch: {
        searchString: function () {
            this.getPublisher()
        },
        currentPage: function () {
            this.getPublisher()
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
            let numPage = Math.ceil(this.numPublisher / this.pageSize)
            if (endPage > numPage)
                endPage -= endPage - numPage
            this.currentPage = endPage + 1 <= numPage ? endPage + 1 : numPage == 0 ? 1 : numPage
        },
        setCurrentPage(page) {
            this.currentPage = page
        },
        async getPublisher() {
            try {
                const data = await publisherService.getPublisher(this.currentPage, this.pageSize, this.searchString)
                if (data.code == 200) {
                    this.numPublisher = data.totalCount
                    this.dataPublisher = data.data
                    if(this.dataPublisher.length == 0)
                        this.previous()
                }
                else {
                    this.$root.openToast('Lỗi server', data.message, 'danger')
                    this.numPublisher = 0
                    this.dataPublisher = []
                }
                this.isLoading = false
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async addOrUpdatePublisher() {
            try {
                const data = this.isAddPublisher ? 
                    await publisherService.addPublisher(this.handleData) :
                    await publisherService.updatePublisher(this.handleData)
                if (data.code == 200) {
                    let title = this.isAddPublisher ? 'Tạo nhà xuất bản thành công' : 'Cập nhật nhà xuất bản thành công'
                    let message = this.isAddPublisher ? 'Bạn đã tạo nhà xuất bản thành công!' : 'Bạn đã cập nhật nhà xuất bản thành công!'
                    this.$root.openToast(title, message, 'success')
                    await this.getPublisher()
                    this.clearData()
                }
                else {
                    if (data.errors) 
                        data.errors.forEach((error, index) => {
                            this.$root.openToast('Lỗi nhập liệu', error.msg, 'danger')})
                    else
                        this.$root.openToast('Lỗi nhập liệu', data.message, 'danger')
                }
            } catch (error) {
                this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
            }
        },
        async deletePublisher(item) {
            this.$root.openModal({
                title: 'Xác nhận xóa',
                message: `Bạn có thật sự muốn xóa ${item.TenNXB}? Việc xóa NXB này sẽ xóa các sách cũng như phiếu mượn sách có liên quan!`,
                onOk: async () => {
                    try {
                        const data = await publisherService.deletePublisher(item)
                        if (data.code == 200) {
                            this.$root.openToast('Xóa thành công', 'Đã xóa nhà xuất bản thành công', 'success')
                            await this.getPublisher()
                        }
                        else 
                            this.$root.openToast('Lỗi server', data.message, 'danger')
                    } catch (error) {
                        this.$root.openToast('Lỗi kết nối', 'Không kết nối được với server', 'danger')
                    }
                }
            })
        },
        setUpdatePublisher(item) {
            this.handleData = { ...item }
            this.isAddPublisher = false
            this.isShowModal = true
        },
        clearData() {
            this.handleData = {}
            this.isAddPublisher = true
            this.isShowModal = false
        }
    },
    created() {
        this.getPublisher()
    },
}
</script>
