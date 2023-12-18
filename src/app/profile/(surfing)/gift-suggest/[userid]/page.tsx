"use client";

import ProductList from "@/app/components/profileComponents/productList/productList";
import ProfileWrapperLittle from "@/app/components/profileComponents/profileWrapperLittle/profileWrapperLittle";

function Profile({ params }: { params: { userid: number } }) {
  return (
    <>
      <div className="py-5 px-2">
        <ProfileWrapperLittle id={params && params.userid ? params.userid : 0} />
        <ProductList userId={params && params.userid ? params.userid : 0} />
      </div>
    </>
  );
}

export default Profile;
