"use client"
// --- TOP BANNER IMPORTS ---
import banner from "../assets/Gemini_Generated_Image_k3f58vk3f58vk3f5.png"
import bannerMobile from "../assets/Gemini_Generated_Image_n5ks6ln5ks6ln5ks.png"
// --- NEW PROMOTIONAL BANNER IMPORTS ---

import promoBanner2 from "../assets/Gemini_Generated_Image_ajgztdajgztdajgz.png"
// ------------------------------------
import { useSelector } from "react-redux"
import { valideURLConvert } from "../utils/valideURLConvert"
import { useNavigate } from "react-router-dom"
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay"

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory)
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => {
      return sub.category.some((c) => c._id == id)
    })
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
    navigate(url)
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Top banner */}
      <div className='mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img
            src={banner}
            className='w-full h-full hidden lg:block'
            alt='banner'
          />
          <img
            src={bannerMobile}
            className='w-full h-full lg:hidden'
            alt='banner'
          />
        </div>
      </div>

      {/********** CATEGORIES SECTION **********/}
      <div className="mx-auto p-6 my-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-4 text-lg">Discover our wide range of premium products</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {loadingCategory
              ? new Array(6).fill(null).map((_, index) => (
                  <div
                    key={index + "loadingcategory"}
                    className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse shadow-lg"
                  >
                    <div className="bg-gradient-to-br from-slate-200 to-slate-300 w-full aspect-square rounded-xl mb-3"></div>
                    <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-6 w-3/4 rounded-lg"></div>
                  </div>
                ))
              : categoryData.map((cat) => (
                  <div
                    key={cat._id + "displayCategory"}
                    className="bg-white rounded-2xl border border-slate-100 cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                    onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="w-full aspect-square flex items-center justify-center p-4 relative z-10">
                      <img
                        src={cat.image || "/placeholder.svg"}
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                        alt={cat.name}
                      />
                    </div>
                    <div className="p-4 relative z-10">
                      <p className="font-bold text-slate-700 capitalize group-hover:text-green-600 transition-colors text-center text-sm">
                        {cat.name}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/********** END CATEGORIES SECTION **********/}

      <div>
        <div className=" overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
          <img
            src={promoBanner2 || "/placeholder.svg"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            alt="Summer juice banner"
          />
        </div>
      </div>

      {/* Category-wise products */}
      <div className="px-4">
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay key={c?._id + "CategorywiseProduct"} id={c?._id} name={c?.name} />
        ))}
      </div>
      {/* End of Category-wise products */}
    </section>
  )
}

export default Home
