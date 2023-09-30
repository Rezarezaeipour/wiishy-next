'use client'
import MyProductList from "@/app/components/myProductList/myProductList";
import ProfileWrapper from "@/app/components/profileWrapper/profileWrapper";

function MyProfile() {
    return (

        <>
            <div className="py-5 px-2">

                <ProfileWrapper image='' name='REZA' gender='man' location='' following='11' followers='22' bio='' />
                <div className="grid grid-cols-2 gap-0 mt-7 mb-10 border-cyan-700">
                     <MyProductList productList={[{title:'x', image:'xx',price:'4321',rate:2}]}/> 
                </div>
            </div>
        </>
    );
}

export default MyProfile;