//codigo original
/*

import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const Product = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)

    const fetchProductData = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                }
            })


            const { data: responseData } = response

            if (responseData.success) {

                setProductData(responseData.data)

            }

        } catch (error) {
            AxiosToastError(error)
        }
    }


    useEffect(() => {
        fetchProductData()
    }, [])

    return (
        <div>
            Produtos
        </div>
    )
}

export default Product */
// codigo corrigido do gemini
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import ProductCardAdmin from '../components/ProductCardAdmin'
import Loading from '../components/Loading'

const Product = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchProductData = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                    limit: 12
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setTotalPageCount(responseData.totalNoPage || responseData.totalPage || 1)
                setProductData(responseData.data || [])
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // DISPARADOR DA PAGINAÇÃO: O [page] garante que a busca seja feita quando a página mudar
    useEffect(() => {
        fetchProductData()
    }, [page])

    const handleNext = () => {
        if (page < totalPageCount) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    return (
        <section className='p-4 bg-blue-50 min-h-[85vh]'>
            <div className='flex justify-between items-center mb-4 bg-white p-4 rounded shadow-sm'>
                <h2 className='font-semibold text-lg'>Produtos</h2>
            </div>

            {loading && <Loading />}

            <div className='min-h-[55vh]'>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    {productData.map((p, index) => {
                        return (
                            <ProductCardAdmin 
                                key={p._id || index} 
                                data={p} 
                                fetchProductData={fetchProductData} 
                            />
                        )
                    })}
                </div>
            </div>

            {/* BARRA DE NAVEGAÇÃO E PAGINAÇÃO */}
            <div className='flex justify-between items-center my-4 gap-2'>
                <button 
                    onClick={handlePrevious} 
                    disabled={page === 1}
                    className="border border-primary-200 px-4 py-1 hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed rounded bg-white"
                >
                    Anterior
                </button>
                
                <span className='w-32 text-center bg-slate-100 py-1 rounded font-medium'>
                    {page} / {totalPageCount}
                </span>

                <button 
                    onClick={handleNext} 
                    disabled={page >= totalPageCount}
                    className="border border-primary-200 px-4 py-1 hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed rounded bg-white"
                >
                    Próximo
                </button>
            </div>
        </section>
    )
}

export default Product

