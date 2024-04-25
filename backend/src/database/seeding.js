import {Reader, Book, Staff, Publisher} from '../models/index.js'
import bcrypt from 'bcrypt'

async function seedingData() {
    const numStaff = await Staff.countDocuments().exec()
    if(numStaff == 0 ){
        let Password = await bcrypt.hash(
            'staff', parseInt(process.env.SALT_ROUNDS))
        await Staff.create({
            MSNV: 'staff1', 
            HoTenNV: 'Nguyễn Văn A', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '789 Đường Lê Văn C, Quận 3, Thành phố Hồ Chí Minh',
            SoDienThoai: '0372753988'
        })
        await Staff.create({
            MSNV: 'staff2', 
            HoTenNV: 'Trần Thị B', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '123 Đường Nguyễn Văn A, Quận 1, Thành phố Hồ Chí Minh',
            SoDienThoai: '0372753989'
        })
        await Staff.create({
            MSNV: 'staff3', 
            HoTenNV: 'Lê Văn C', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '456 Đường Trần Thị B, Quận 2, Thành phố Hồ Chí Minh',
            SoDienThoai: '0372753990'
        })
        await Staff.create({
            MSNV: 'staff4', 
            HoTenNV: 'Phạm Thị D', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '101 Đường Phạm Thị D, Quận 4, Thành phố Hồ Chí Minh',
            SoDienThoai: '0372753991'
        })
        await Staff.create({
            MSNV: 'staff5', 
            HoTenNV: 'Hoàng Văn E', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '202 Đường Hoàng Văn E, Quận 5, Thành phố Hồ Chí Minh',
            SoDienThoai: '0372753992'
        })
        await Staff.create({
            MSNV: 'staff6', 
            HoTenNV: 'Huỳnh Thị F', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '666 Đường Trương Thị T, Quận Thủ Đức, Thành phố Hồ Chí Minh',
            SoDienThoai: '037275398893'
        })
        await Staff.create({
            MSNV: 'staff7', 
            HoTenNV: 'Phan Văn G', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '456 Đường Trần Thị B, Thành phố Hải Phòng, Hải Phòng',
            SoDienThoai: '0372753994'
        })
        await Staff.create({
            MSNV: 'staff8', 
            HoTenNV: 'Võ Thị H', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '505 Đường Võ Thị H, Thành phố Buôn Ma Thuột, Đắk Lắk',
            SoDienThoai: '0372753995'
        })
        await Staff.create({
            MSNV: 'staff9', 
            HoTenNV: 'Đặng Văn I', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '909 Đường Hồ Thị M, Thành phố Thanh Hóa, Thanh Hóa',
            SoDienThoai: '0372753996'
        })
        await Staff.create({
            MSNV: 'staff10', 
            HoTenNV: 'Bùi Thị K', 
            Password: Password, 
            Chucvu: 'Nhân viên', 
            Diachi: '666 Đường Trương Thị T, Thành phố Phan Thiết, Bình Thuận',
            SoDienThoai: '0372753997'
        })
    }

    const numReader = await Reader.countDocuments().exec()
    if(numReader == 0 ){
        await Reader.create({
            MaDocGia: 'reader1', 
            HoLot: 'Lương Thị', 
            Ten: 'Văn', 
            NgaySinh: '13/01/2003',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader2', 
            HoLot: 'Đinh Văn', 
            Ten: 'Úng', 
            NgaySinh: '12/11/2001',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader3', 
            HoLot: 'Trương Thị', 
            Ten: 'Tien', 
            NgaySinh: '12/12/2000',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader4', 
            HoLot: 'Vũ Văn', 
            Ten: 'Sáu', 
            NgaySinh: '04/02/2001',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader5', 
            HoLot: 'Trịnh Thị', 
            Ten: 'Ra', 
            NgaySinh: '01/01/1993',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader6', 
            HoLot: 'Lý Văn', 
            Ten: 'Quý', 
            NgaySinh: '21/03/1999',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader7', 
            HoLot: 'Dương Thị', 
            Ten: 'Phương', 
            NgaySinh: '16/02/2002',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader8', 
            HoLot: 'Ngô Văn', 
            Ten: 'Nhật', 
            NgaySinh: '18/09/2004',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader9', 
            HoLot: 'Hồ Thị', 
            Ten: 'Mượn', 
            NgaySinh: '27/10/2003',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
        await Reader.create({
            MaDocGia: 'reader10', 
            HoLot: 'Đỗ Văn', 
            Ten: 'Linh', 
            NgaySinh: '11/08/2001',
            Phai: 'Nữ',
            DiaChi: 'Long Khanh, Hau Giang',
            DienThoai: '0928372611'
        })
    }
    let tempPublisher1 = {}
    let tempPublisher2 = {}
    let tempPublisher3 = {}
    let tempPublisher4 = {}
    let tempPublisher5 = {}
    const numPublisher = await Publisher.countDocuments().exec()
    if(numPublisher == 0 ){
        tempPublisher1 = await Publisher.create({
            MaNXB: 'publisher1', 
            TenNXB: 'Nhà xuất bản Trẻ', 
            DiaChi: '161B, phường Võ Thị Sáu, Hồ Chí Minh',
        })
        tempPublisher2 = await Publisher.create({
            MaNXB: 'publisher2', 
            TenNXB: 'Nhà xuất bản Kim Đồng', 
            DiaChi: 'Số 21, Dãy A11, Khu Đầm Trấu',
        })
        tempPublisher3 = await Publisher.create({
            MaNXB: 'publisher3', 
            TenNXB: 'NXB Tổng Hợp TPHCM', 
            DiaChi: 'Ô Chợ Dừa, Q. Đống Đa, Hà Nội',
        })
        tempPublisher4 = await Publisher.create({
            MaNXB: 'publisher4', 
            TenNXB: 'Nhà xuất bản Hội Nhà văn', 
            DiaChi: '59 Đỗ Quang, Cầu Giấy, Hà Nội',
        })
        tempPublisher5 = await Publisher.create({
            MaNXB: 'publisher5', 
            TenNXB: 'Nhà xuất bản Phụ nữ Việt Nam', 
            DiaChi: '175 Giảng Võ, Đống Đa, Hà Nội',
        })
    }

    const numBook = await Book.countDocuments().exec()
    if(numBook == 0 ){
        await Book.create({
            MaSach: 'book1', 
            TenAnh: 'Book1.jpg', 
            TenSach: 'Harry Potter và Bảo bối tử thần',
            DonGia: 600000,
            SoQuyen: 13,
            NamXuatBan: 2007,
            MaNXB: tempPublisher1._id, 
            TenTacGia: 'J. K. Rowling',
        })
        await Book.create({
            MaSach: 'book2', 
            TenAnh: 'Book2.jpg', 
            TenSach: 'Harry Potter và Hội Phượng Hoàng ',
            DonGia: 892000,
            SoQuyen: 27,
            NamXuatBan: 2003,
            MaNXB: tempPublisher1._id, 
            TenTacGia: 'J. K. Rowling',
        })
        await Book.create({
            MaSach: 'book3', 
            TenAnh: 'Book3.jpg', 
            TenSach: 'Harry Potter và chiếc cốc lửa',
            DonGia: 792000,
            SoQuyen: 10,
            NamXuatBan: 2000,
            MaNXB: tempPublisher1._id, 
            TenTacGia: 'J. K. Rowling',
        })
        await Book.create({
            MaSach: 'book4', 
            TenAnh: 'Book4.jpg', 
            TenSach: 'Bắt trẻ đồng xanh',
            DonGia: 297000,
            SoQuyen: 8,
            NamXuatBan: 1987,
            MaNXB: tempPublisher2._id, 
            TenTacGia: 'J. D. Salinger',
        })
        await Book.create({
            MaSach: 'book5', 
            TenAnh: 'Book5.jpg', 
            TenSach: 'Nhà giả kim',
            DonGia: 390000,
            SoQuyen: 14,
            NamXuatBan: 1988,
            MaNXB: tempPublisher2._id, 
            TenTacGia: 'Paulo Coelho',
        })
        await Book.create({
            MaSach: 'book6', 
            TenAnh: 'Book6.jpg', 
            TenSach: 'Nghĩ giàu, làm giàu',
            DonGia: 182000,
            SoQuyen: 31,
            NamXuatBan: 1938,
            MaNXB: tempPublisher2._id, 
            TenTacGia: 'Napoleon Hill',
        })
        await Book.create({
            MaSach: 'book7', 
            TenAnh: 'Book7.jpg', 
            TenSach: 'Mật mã Da Vinci',
            DonGia: 982000,
            SoQuyen: 4,
            NamXuatBan: 2003,
            MaNXB: tempPublisher3._id, 
            TenTacGia: 'Dan Brown',
        })
        await Book.create({
            MaSach: 'book8', 
            TenAnh: 'Book8.jpg', 
            TenSach: 'Cô ấy',
            DonGia: 319200,
            SoQuyen: 6,
            NamXuatBan: 1999,
            MaNXB: tempPublisher3._id, 
            TenTacGia: 'H.Rider Haggard',
        })
        await Book.create({
            MaSach: 'book9', 
            TenAnh: 'Book9.jpg', 
            TenSach: 'Sư tử, phù thủy và cái tủ áo',
            DonGia: 1203000,
            SoQuyen: 6,
            NamXuatBan: 1950,
            MaNXB: tempPublisher2._id, 
            TenTacGia: 'C.S. Lewis',
        })
        await Book.create({
            MaSach: 'book10', 
            TenAnh: 'Book10.jpg', 
            TenSach: 'Người Hobbit',
            DonGia: 1400000,
            SoQuyen: 15,
            NamXuatBan: 1937,
            MaNXB: tempPublisher3._id, 
            TenTacGia: 'J.R.R. Tolkien',
        })
        await Book.create({
            MaSach: 'book11', 
            TenAnh: 'Book11.jpg', 
            TenSach: 'Hồng Lâu Mộng',
            DonGia: 920000,
            SoQuyen: 3,
            NamXuatBan: 1944,
            MaNXB: tempPublisher4._id, 
            TenTacGia: 'Lý Văn Bá',
        })
        await Book.create({
            MaSach: 'book12', 
            TenAnh: 'Book12.jpg', 
            TenSach: 'Và rồi chẳng còn ai',
            DonGia: 362000,
            SoQuyen: 27,
            NamXuatBan: 1939,
            MaNXB: tempPublisher4._id, 
            TenTacGia: 'Agatha Christie',
        })
        await Book.create({
            MaSach: 'book13', 
            TenAnh: 'Book13.jpg', 
            TenSach: 'Hoàng tử bé',
            DonGia: 847000,
            SoQuyen: 2,
            NamXuatBan: 1942,
            MaNXB: tempPublisher4._id, 
            TenTacGia: 'Antoie de Saint-Exupéry',
        })
        await Book.create({
            MaSach: 'book14', 
            TenAnh: 'Book14.jpg', 
            TenSach: 'Chúa tể của những chiếc nhẫn',
            DonGia: 928000,
            SoQuyen: 14,
            NamXuatBan: 2000,
            MaNXB: tempPublisher5._id, 
            TenTacGia: 'J.R.R Tolkien',
        })
        await Book.create({
            MaSach: 'book15', 
            TenAnh: 'Book15.jpg', 
            TenSach: 'Chuyện hai thanh phố',
            DonGia: 333000,
            SoQuyen: 32,
            NamXuatBan: 1922,
            MaNXB: tempPublisher5._id, 
            TenTacGia: 'Charles Dickens',
        })
    }

}

export default seedingData