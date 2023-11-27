
module.exports = {
    createEditPopupForCategories: (data, category_id) => {
        return data.map(element => {
            return `
            <div class="z-10 w-[1000px] my-[20px] p-[30px] scrollbar-thin scrollbar-track-white scrollbar-thumb-red-500 bg-white flex flex-col shadow-lg shadow-black" style="overflow-y: scroll;">
                <div><a href="/admin/dashboard/manage-category" class="text-[20px] hover:border-b-[2px] hover:border-red-500">&larr; Go Back</a></div>
                <div class="flex justify-center text-[20px]">Edit Category</div>
                <div class="flex justify-center">
                    <form action="/api/proxy/catman/change" id="editForm" method="post" class="w-[800px] flex flex-col">
                        <div class="text-[20px] text-gray-500">At depth : ${element.category_depth}</div>
                        <input type="hidden" name="id" value="${category_id}">
                        <label for="catname" class="mt-[10px]">Category Name</label>
                        <div class="bordergradient w-full h-[45px] my-[10px]">
                            <input type="text" id="catname" name="catName" value="${element.category_name}" placeholder="Enter the Category Name..." class="formfield h-[40px]" required>
                        </div>
                        <label for="altname" class="mt-[10px]">Alternative Name</label>
                        <div class="bordergradient w-full h-[45px] my-[10px]">
                            <input type="text" id="altname" name="altName" value="${element.alt_name}" placeholder="Enter the Alternative Category Name..." class="formfield h-[40px]" required>
                        </div>
                        <label for="catdesc" class="mt-[10px]">Product Description</label>
                        <div class="bordergradient w-full h-[155px] my-[10px]">
                            <textarea id="catdesc" name="catDesc" placeholder="Enter the Category Description..." class="formfield h-[150px] resize-none" required>${element.category_description}</textarea>
                        </div>
                        <div class="flex w-full h-[45px] my-[20px]">
                            <button id="btnstyle1" type="button" onclick="clearForm(['catdesc', 'altname', 'catname'])" class="style1button w-full h-[40px] mr-[20px]">Clear</button>
                            <button id="btnstyle1" type="submit" class="style1button w-full h-[40px]">Submit</button>
                        </div> 
                    </form>
                </div>
            </div>
        `
        }).join('');
    },

    createSelectForCategories: (data) => {
        let newSelect = `<div class="w-full flex flex-row my-[20px]">
        <div class="bordergradient w-full h-[50px]">
        <select id="${data[0].category_depth}" name="catfor${data[0].category_depth}" onchange="getThisSub(this.value, this.id)" class="formfield h-[45px]">
        <option value="">Select the Category</option>
        <option value="new" class="bg-red-500 text-white">Add a New Category</option>
        `;

        const newOption = data.map(element => {
            return `<option value="${element.category_id}">${element.alt_name}</option>`;
        }).join('');

        newSelect += newOption + `</select>
        </div>
        <button onclick="editThisCategory(this.value)" type="button" id="${data[0].category_depth}change" class="style1button w-auto h-[30px] p-[20px] ml-[10px]">Edit</button>
        <button type="button" class="style1button w-auto h-[30px] p-[20px] ml-[10px]"><a id="${data[0].category_depth}delete">Delete</a></button>
        </div>`;

        return newSelect;
    },

    createSelectForCategoriesVendor: (data) => {
        let newSelect = `<div class="w-full flex flex-row my-[20px]">
        <div class="bordergradient w-full h-[50px]">
        <select id="${data[0].category_depth}" name="${data[0].category_depth}" onchange="getThisSub(this.value, this.id)" class="formfield h-[45px]" required>
        <option value="">Select the Category</option>
        <option value="new" class="bg-red-500 text-white">Add a New Category</option>
        `;

        const newOption = data.map(element => {
            return `<option value="${element.category_id}">${element.alt_name}</option>`;
        }).join('');

        newSelect += newOption + `</select> </div> </div>`;

        return newSelect;
    },

    createAddPopupForCategories: (data) => {
        let parentCatInfo;

        if(data.length > 0){
            parentCatInfo = data.map(element => {
                return `
                <div class="text-[20px] text-gray-400">At depth : ${(element.category_depth + 1)}</div>
                <input type="hidden" name="depth" value="${(element.category_depth + 1)}">
                <div class="text-[20px] text-gray-400">In ${element.alt_name}</div>
                <input type="hidden" name="ref" value="${element.category_id}">
                `
            }).join('');
            } else {
                parentCatInfo = `
                <div class="text-[20px] text-gray-400">At depth : 0</div>
                <input type="hidden" name="depth" value="0">
                <div class="text-[20px] text-gray-400">New Root Category</div>`;
            }

            return `
                <div class="z-10 w-[1000px] my-[20px] p-[30px] scrollbar-thin scrollbar-track-white scrollbar-thumb-red-500 bg-white flex flex-col shadow-lg shadow-black" style="overflow-y: scroll;">
                    <div><a href="/admin/dashboard/manage-category" class="text-[20px] hover:border-b-[2px] hover:border-red-500">&larr; Go Back</a></div>
                    <div class="flex justify-center text-[20px]">Add Category</div>
                    <div class="flex justify-center">
                        <form action="/api/proxy/catman/add" method="post" class="w-[800px] flex flex-col">
                            ${parentCatInfo}
                            <label for="catname" class="mt-[10px]">Category Name</label>
                            <div class="bordergradient w-full h-[45px] my-[10px]">
                                <input type="text" id="catname" name="catName" placeholder="Enter the Category Name..." class="formfield h-[40px]" required>
                            </div>
                            <label for="altname" class="mt-[10px]">Alternative Name</label>
                            <div class="bordergradient w-full h-[45px] my-[10px]">
                                <input type="text" id="altname" name="altName" placeholder="Enter the Alternative Category Name..." class="formfield h-[40px]" required>
                            </div>
                            <label for="catdesc" class="mt-[10px]">Product Description</label>
                            <div class="bordergradient w-full h-[155px] my-[10px]">
                                <textarea id="catdesc" name="catDesc" placeholder="Enter the Category Description..." class="formfield h-[150px] resize-none" required></textarea>
                            </div>
                            <div class="flex w-full h-[45px] my-[20px]">
                                <button id="btnstyle1" type="reset" class="style1button w-full h-[40px] mr-[20px]">Clear</button>
                                <button id="btnstyle1" type="submit" class="style1button w-full h-[40px]">Submit</button>
                            </div> 
                        </form>
                    </div>
                </div>
            `;
    },
    
}