import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from 'react-redux'   // ✅ corrigido (estava useSelectpr)
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory) // ✅ precisa estar dentro da função
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    //console.log(id, cat)
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id === id
      })
      return filterData ? true : null
    })
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
    //console.log(url)
  }

  return (
    <section className="bg-white bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
      <div className="relative w-full mt-4"></div>
      <div
        className={`w-full h-full min-h-48 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 rounded ${!banner && "animate-pulse my-2"
          }`}
      >
        <img
          src={banner}
          className="absolute top-0 left-0 w-full h-auto min-h-full object-contain hidden lg:block" 
          alt="banner"
        />
        <img
          src={bannerMobile}
          className="absolute top-0 left-0 w-full h-auto min-h-full object-contain lg:hidden" 
          alt="banner"
        />
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat, index) => {
              return (
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full"
                  onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                >
                  <div>
                    <img
                      src={cat.image}
                      className="w-full h-full object-scale-down"
                      alt={cat.name}
                    />
                  </div>
                </div>
              )
            })
          )
        }
      </div>

      {
        categoryData?.map((c, index) => {
          return (
            <CategoryWiseProductDisplay
              key={c?._id + "CategorywiseProduct"}
              id={c?._id}
              name={c?.name}  
            />
          )
        })
      }
    </section>
  );
};

export default Home;