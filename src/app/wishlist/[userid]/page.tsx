"use client";

import GeneralProductList from "@/app/components/profileComponents/generalProductList/generalProductList";
import ProfileWrapperLittle from "@/app/components/profileComponents/profileWrapperLittle/profileWrapperLittle";

function Profile({ params }: { params: { userid: number } }) {
  return (
    <>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          padding: "15px 20px",
          backgroundColor: "white",
          borderBottom: "solid thin #d4d4d4 !important",
        }}
      >
        <h1 className="main-head">This is my Wishlist</h1>
        <p className="text-xs">Here is my Wishlist. If you want to buy me a gift, please choose from the list below. </p>
      </div>
      <div className="py-5 px-2">
        <ProfileWrapperLittle
          id={params && params.userid ? params.userid : 0}
        />
        <GeneralProductList userId={params && params.userid ? params.userid : 0} />
      </div>
    </>
  );
}

export default Profile;
