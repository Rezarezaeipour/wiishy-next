'use client'
import ProductCard from "@/app/components/productCard/productCard";
import ProfileWrapper from "@/app/components/profileWrapper/profileWrapper";

function MyProfile() {
    return (

        <>
            <div className="py-5 px-2">
                
                <ProfileWrapper image='' name='REZA' gender='man' location='' following='11' followers='22' bio='' />
                <div className="grid grid-cols-2 gap-0 mt-7 mb-10 border-cyan-700">
             
                    <ProductCard title='' image='' price='' rate={0} />
                    <ProductCard title='' image='' price='' rate={0} />
                    <ProductCard title='' image='' price='' rate={0} />
                    <ProductCard title='' image='' price='' rate={0} />
                   
                </div>
            </div>
        </>
    );
}

export default MyProfile;