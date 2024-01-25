export async function getCategoryList() {
    const response = await fetch("/api/getcategorylist", {
        method: "GET",
    });
    console.log(response)
    if (response.ok){
        return response.json();
    }else{
        return "something went wrong";
    }

}