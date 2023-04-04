export default class SPAManager{

    //Fields
    pm;
    um;

    //Entry Point - Constructor
    constructor(userModel, pageManager){
        //Assignments
        this.um = userModel;
        this.pm = pageManager;
        this.setTriggers();
    }

    //Page call functions
    homeContent(){
        $("#mainContainer").html(this.pm.homeContent);
        window.location = '';
        this.checkUser();
    }

    browseRecipesContent(){
        $("#mainContainer").html(this.pm.browseContent);
        this.checkUser();
    }

    createRecipesContent(){
        $("#mainContainer").html(this.pm.createContent);
        this.checkUser();
    }

    yourRecipesContent(){
        $("#mainContainer").html(this.pm.yourContent);
        this.checkUser().then(() => {
            this.um.setRecipeData();
        });
    }

    editRecipesContent(){
        $("#mainContainer").html(this.pm.editContent);
        this.um.pullRecipeData();
        this.checkUser();
    }

    viewRecipesContent(){
        $("#mainContainer").html(this.pm.viewContent);
        this.checkUser();
    }

    loginCreateAccountContent(){
        $("#mainContainer").html(this.pm.loginSignupContent);
        this.checkUser();
    }

    defaultContent(){
        $("#mainContainer").html(this.pm.defaultContent);
        this.checkUser();
    }



    //Account functions
    createAccount(){
        let fName = $("#fName").val();
        let lName = $("#lName").val();
        let email = $("#createEmail").val();
        let password = $("#createPassword").val();
        this.um.createUser(fName, lName, email, password);
    }

    login(){
        let email = $("#loginEmail").val();
        let password = $("#loginPassword").val();
        this.um.loginUser(email, password);
    }

    logout(){
        this.um.logoutUser();
    }

    // setCustomRecipe(){
    //     let recipeList = {
    //         "hours":$("#recipesTotalTime").split(" ")[0],
    //         "image": "/assets/images/recipes/recipe-burger.png",
    //         "minutes":$("#recipesTotalTime").split(" ")[2],
    //         "name":$("recipeName"),
    //         "servings":$("#recipeServingSize"),
    //         "description":$("#recipeDesc"),
    //         "ingredients":[
    //             $("#ingredient1"),
    //             $("#ingredient2"),
    //             $("#ingredient3")
    //         ],
    //         "instructions":[
    //             $("#instruction1"),
    //             $("#instruction2"),
    //             $("#instruction3")
    //         ]
    //     };
    //     this.um.updateRecipe(recipeList);
    // }

    async pushRecipeUpdate(){
        // let h = $("#recipesTotalTime").html().split(" ")[0];
        // let m = $("#recipesTotalTime").split(" ")[1];
        // console.log(h + " | " + m);
        let recipeList = {
            "hours":$("#recipeTotalTime").val().split(" ")[0],
            "image": "/assets/images/recipes/recipe-burger.png",
            "minutes":$("#recipeTotalTime").val().split(" ")[1],
            "name":$("#recipeName").val(),
            "servings":$("#recipeServingSize").val(),
            "description":$("#recipeDesc").val(),
            "ingredients":[
                $("#ingredient1").val(),
                $("#ingredient2").val(),
                $("#ingredient3").val()
            ],
            "instructions":[
                $("#instruction1").val(),
                $("#instruction2").val(),
                $("#instruction3").val()
            ]
        };
        console.log(recipeList);
        this.um.updateRecipe(recipeList);
    }

    async checkUser(){
        this.um.checkForUser();
        // this.um.setRecipeData();
        // $("#userFNameTitle").html("user");
        // if(this.um.user.first_name == undefined){
        //     $("#userFNameTitle").html("user");
        // }else{
        //     $("#userFNameTitle").html(this.um.user.first_name);
        // }
    }



    //View update function
    updateView(){
        console.log("Update view.");
        $('title').html(`${window.location.hash.split('#')[1]} Page`);
        window.scrollTo(0, 0);
        $("#mainMenu").css("display", "none");
        this.checkUser();
        this.setTriggers();
        console.log("The title is visible.");
        console.log($('#recipeTitle'));
        console.log($("#recipeTitle").html());
    }


    // setRecipeData(){
    //     let rl = this.um.user.customRecipe;
    //     console.log(rl);
    //     $('#recipeTitle').html(rl.name);
    //     $("#recipeDescription").html(rl.description);
    //     $("#hoursVal").html(rl.hours);
    //     $("#minutesVal").html(rl.minutes);
    //     $('#servingsVal').html(rl.servings);
    //     for(var i = 0; i < rl.ingredients.length; i++){
    //         $("#ingredients").append(rl.ingredients[i]);
    //     }
    //     for(var i = 0; i < rl.ingredients.length; i++){
    //         $("#instructions").append(rl.instructions[i]);
    //     }
    // }

    //Trigger assignment function
    setTriggers(){

        //Document ready trigger
        $(document).ready(e => {
            console.log(window.location.hash);
            if(window.location.hash != ''){
                this.hashChange();
            }else{
                $("#mainContainer").html(this.defaultContent());
            }
        });

        //URL hash change (https://app.com/#VAR) trigger
        $(window).on("hashchange", e => {
            this.hashChange(); 
        });

        //Hamburger menu trigger
        $("#hamburger").on("click", e =>{
            if($("#mainMenu").css("display") == "none"){
                $("#mainMenu").css("display", "block");
            }else if($("#mainMenu").css("display") == "block"){
                $("#mainMenu").css("display", "none");
            }
        });
    }

    hashChange(){
        //Hash switch statement
        switch(window.location.hash){
            case "#HOME":
                this.homeContent();
                break;
            case "#BROWSE":
                this.browseRecipesContent();
                break;
            case "#CREATE":
                this.createRecipesContent();
                break;
            case "#CREATE-RECIPE":
                this.pushRecipeUpdate();
                break;
            case "#YOURRECIPE":
                this.yourRecipesContent();
                break;
            case "#EDIT":
                this.editRecipesContent();
                break;
            case "#EDIT-RECIPE":
                this.pushRecipeUpdate();
                break;
            case "#VIEW":
                this.viewRecipesContent();
                break;
            case "#LOGIN":
                this.loginCreateAccountContent();
                break;
            case "#LOGIN-USER":
                this.login();
                break;
            case "#LOGOUT":
                this.logout();
                break;
            case "#SIGNUP-USER":
                this.createAccount();
                break;
            default:
                break;
        }
    }
}





































/*

// window.location = $(location).attr("href").split("#")[0];
        //Window resize trigger (under development)
        // $(window).on("resize", e => {
        //     var pageWidth = e.currentTarget.innerWidth;
        //     if(pageWidth >= 960){
                
        //     }else{

        //     }
        // });

                    // console.log("Hello from routeTo()" + window.location.hash);
updateDetailsPage(page){
        console.log("Hello from udp");
        for(var i = 0;i < 10;i++){
            console.log(i);
            console.log(page);
            console.log(this.gm.objectData["Developers"][i]["title"].toLowerCase());
            switch(page){
                case "capcom":
                    page = "Capcom";
                    break;
                case "bethesda":
                    page = "Bethesda Softworks";
                    break;
                case "blizzard":
                    page = "Blizzard Entertainment";
                    break;
                case "rockstar":
                    page = "Rockstar Games";
                    break;
                case "scottCawthon":
                    page = "Scott Cawthon";
                    break;
                case "ea":
                    page = "Electronic Arts";
                    break;
                case "naughtyDog":
                    page = "Naughty Dog";
                    break;
                case "squareEnix":
                    page = "Square Enix";
                    break;
                case "nintendo":
                    page = "Nintendo";
                    break;
                case "fromSoftware":
                    page = "From Software";
                    break;
            }
            // if(this.gm.objectData["Developers"][i]["title"].toLowerCase() == page){
            if(this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page ||
            this.gm.objectData["Developers"][i]["title"] == page){

                var objectString = `    
                <div id="gallery">
                    <div id="galleryContent">
                        <div id="galleryTitle">Monster Hunter Rise</div>
                        <img id="galleryImage" src="assets/images/games/mhrise.jpg" />
                        <div id="galleryPublisher">Nintendo</div>
                        <div id="galleryGenre">Fighting</div>
                        <div id="galleryPlatforms">Switch/PS4/XBOX/PC</div>
                    </div>
                </div>
                `;

                var finalString = ``;
                for(var m = 0;m < 10;m++){

                    finalString += `
                    <div id="gallery">
                        <div id="galleryContent">
                            <div id="galleryTitle">${this.gm.objectData["Developers"][i]["Games"][m]["title"]}</div>
                            <img id="galleryImage" src="${this.gm.objectData["Developers"][i]["Games"][m]["image"]}" />
                            <div id="galleryPublisher">${this.gm.objectData["Developers"][i]["title"]}</div>
                            <div id="galleryGenre">${this.gm.objectData["Developers"][i]["Games"][m]["genre"]}</div>
                            <div id="galleryPlatforms">${this.gm.objectData["Developers"][i]["Games"][m]["platforms"]}</div>
                        </div>
                    </div>
                    `;
                    // $("#galleryTitle").html(this.gm.objectData["Developers"][i]["Games"][1]["title"]);
                    // $("#galleryImage").attr("src", `${this.gm.objectData["Developers"][i]["Games"][1]["image"]}`);
                    // $("#galleryPublisher").html(this.gm.objectData["Developers"][i]["Games"][1]["publisher"]);
                    // $("#galleryGenre").html(this.gm.objectData["Developers"][i]["Games"][1]["genre"]);
                    // $("#galleryPlatforms").html(this.gm.objectData["Developers"][i]["Games"][1]["platforms"]);
                }
                $("#gallery").css("flex-direction", "column");
                $("#gallery").html(finalString);
                break;
            }
        }
    }
    setTriggers(){
        $(".imageContainerSection img").mouseenter(e => {
            $(".overlayImageContainer").css("display", "block");
        });
        $(".overlayImageContainer").mouseleave(e => {
            $(".overlayImageContainer").css("display", "none");
        });
    }


    detailsPage(page){
        console.log("Hello from dp");
        switch(page){
            case "capcom":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "bethesda":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "blizzard":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "ea":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "fromSoftware":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "naughtyDog":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "nintendo":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "rockstar":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "scottCawthon":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            case "squareEnix":
                $("#mainContainer").html(this.um.detailContent);
                this.updateDetailsPage(page);
                break;
            default:
                break;
        }
    }
        {
            "title":"Monster Hunter Rise",
            "publisher":"Capcom",
            "genre":"Fighting",
            "platforms":"Switch/PS4/XBOX/PC",
            "image":"assets/images/mhrise.jpg"
        },
        {
            "title":"Super Smash Bros. Ultimate",
            "publisher":"Nintendo",
            "genre":"Fighting",
            "platforms":"Switch",
            "image":"assets/images/ssbu.jpg"
        },
        {
            "title":"Monster Hunter Generations Ultimate",
            "publisher":"Capcom",
            "genre":"Fighting",
            "platforms":"Switch",
            "image":"assets/images/mhgu.jpg"
        },
        {
            "title":"Super Mario Odyssey",
            "publisher":"Nintendo",
            "genre":"Platformer",
            "platforms":"Switch",
            "image":"assets/images/smo.jpg"
        },
        {
            "title":"Legend of Zelda: Breath of the Wild",
            "publisher":"Nintendo",
            "genre":"Adventure/Puzzle",
            "platforms":"Switch",
            "image":"assets/images/lozbotw.jpg"
        },
        {
            "title":"Metroid Prime Remastered",
            "publisher":"Nintendo",
            "genre":"Adventure",
            "platforms":"Switch",
            "image":"assets/images/mpr.jpg"
        },
        {
            "title":"Super Mario Kart 8 Deluxe",
            "publisher":"Nintendo",
            "genre":"Racing",
            "platforms":"Switch",
            "image":"assets/images/smk8d.jpg"
        },
        {
            "title":"Monster Hunter World",
            "publisher":"Capcom",
            "genre":"Fighting",
            "platforms":"PS4/XBOX/PC",
            "image":"assets/images/mhworld.jpg"
        },
        {
            "title":"Bloodborne",
            "publisher":"FromSoftware",
            "genre":"RPG",
            "platforms":"PS4",
            "image":"assets/images/bb.jpg"
        },
        {
            "title":"Pokemon Shield",
            "publisher":"Nintendo",
            "genre":"RPG",
            "platforms":"Switch",
            "image":"assets/images/ps.jpg"
        }
*/