import {Publisher} from '../models/index.js'
import {Exception} from '../exceptions/index.js'
import mongoose  from 'mongoose'

const getAllPublisher = async ({
    page, 
    size,
    searchString,
}) => {
    page = parseInt(page);
    size = parseInt(size);
    let filteredPipeline = [
        {
            $match: {
                $or: [
                    {
                        MaNXB: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        TenNXB: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size }
    ];

    let countPipeline = [
        {
            $match: {
                $or: [
                    {
                        MaNXB: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        TenNXB: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                ]
            }
        },
        { $count: "totalCount" }
    ];

    let [filteredPublishers, countResult] = await Promise.all([
        Publisher.aggregate(filteredPipeline),
        Publisher.aggregate(countPipeline)
    ]);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    return { filteredPublishers, totalCount };
};

const getPublisherById = async(publisherId) => {
    const publisher = await Publisher.findById(publisherId)
    if (!publisher)
            throw new Exception('Publisher not found')
    if(!publisher) {
        throw new Exception('Cannot find publisher with id ' + publisherId)
    }
    return publisher 
}

const getPublisherByMaNXB = async(publisherMNV) => {
    const publisher = await Publisher.findOne({ 'MaNXB': publisherMNV }).exec()
    if (!publisher)
            throw new Exception('Publisher not found')
    return publisher 
}

const addPublisher = async ({
    MaNXB='', 
    TenNXB='', 
    DiaChi='', 
}) => {
    const existingPublisher = await Publisher.findOne({ MaNXB }).exec()
    if (!!existingPublisher) 
        throw new Exception(Exception.USER_EXIST)
    
    const publisher = await Publisher.create({
        MaNXB, 
        TenNXB, 
        DiaChi, 
    })
    return publisher
}

const updatePublisher = async ({
    _id,
    MaNXB, 
    TenNXB,
    DiaChi, 
}) => {  
    if (_id){
        const publisher = await Publisher.findById(_id) 
        if (!publisher)
            throw new Exception('Không tìm thấy nhà xuất bản')
        if (MaNXB && MaNXB != publisher.MaNXB){
            const num = await Publisher.countDocuments({ MaNXB}).exec()
            if (num > 0)
                throw new Exception('Mã nhà xuất bản đã tồn tại')
        }
        publisher.MaNXB = MaNXB ?? publisher.MaNXB
        publisher.TenNXB = TenNXB ?? publisher.TenNXB
        publisher.DiaChi = DiaChi ?? publisher.DiaChi
        await publisher.save()
        return publisher   
    }else {
        throw new Exception('Data must have id or MaNXB')
    }
}

const deletePublisher = async ({
    id,
    MaNXB
}) => { 
    if (id || MaNXB){ 
        let deletedPublisher = ''
        if (id){
            deletedPublisher = await Publisher.findByIdAndDelete(id)
        } else {
            let temp =  await Publisher.findOne({MaNXB})
            deletedPublisher = await Publisher.findByIdAndDelete(temp._id)
        }
        if (!deletedPublisher)
            throw new Exception('Publisher not found')
        return deletedPublisher
    }else {
        throw new Exception('Data must have id or MaNXB')
    }
}

export default {
    getAllPublisher,
    getPublisherById,
    getPublisherByMaNXB,
    addPublisher,
    updatePublisher,
    deletePublisher,
}