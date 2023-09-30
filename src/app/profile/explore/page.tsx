import ProductCard from "@/app/components/myProductCard/MyProductCard";
import ProductList from "@/app/components/productList/productList";

function Explore() {
    return (<>
        <div className="py-5 px-2">
            <h1 className="main-head">Explore</h1>
            <div className="grid grid-cols-2 gap-0 mt-7 mb-10 ">
               <ProductList productList={[{title:'x', image:'xx',price:'4321',rate:2}]}/> 
            </div>
        </div>
    </>);
}

export default Explore;