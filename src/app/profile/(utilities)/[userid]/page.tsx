"use client";

import ProductList from "@/app/components/productList/productList";
import ProfileWrapper from "@/app/components/profileWrapper/profileWrapper";

function Profile({ params }: { params: { userid: number } }) {
  return (
    <>
      <div className="py-5 px-2">
        <ProfileWrapper id={params && params.userid ? params.userid : 0} />
        <ProductList userId={params && params.userid ? params.userid : 0} />
      </div>
    </>
  );
}

export default Profile;
