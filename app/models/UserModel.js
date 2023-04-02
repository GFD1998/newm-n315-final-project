import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

import { collection, doc, getDocs, setDoc, addDoc} from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js';

import { getStorage } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js';

export default class UserModel{

    user;
    recipes;
    auth;
    db;
    userTable;


    constructor(db){
        this.auth = getAuth();
        this.db = db;
        this.userTable = collection(this.db, "User");
    }

    async pullUserData(loginEmail){
        var user = this.getUserDocs(loginEmail);
        return user;
    }

    async pullRecipeData(loginEmail){
        var recipes = this.getRecipeDocs();
        return recipes;
    }

    async getUserDocs(loginEmail){
        var ref = collection(this.db, "User");
        var snap = await getDocs(ref);
        var i = 0, d = 0;
        console.log(snap);
        while(i < snap._snapshot.docChanges.length - 1 && d == 0){
            if(snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.email.stringValue.toLowerCase() != loginEmail){
                console.log(loginEmail + " | " + snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.email.stringValue.toLowerCase());
                i++;
            }else{
                 d = 1;
            }
        }

        this.user = {
            "first_name":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.first_name.stringValue,
            "last_name":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.last_name.stringValue,
            "email":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.email.stringValue,
            "password":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.password.stringValue
        };

        console.log(this.user);
        return this.user;
    }

    async getRecipeDocs(){
        var ref = collection(this.db, "Recipe");
        var snap = await getDocs(ref);

        this.recipes = snap._snapshot.docChanges;
        console.log(snap._snapshot.docChanges);
        var recipeList = [];

        for(var i = 0; i < snap._snapshot.docChanges.length; i++){
            recipeList.push({
                    "active":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.active.integerValue,
                    "hours":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.hours.integerValue,
                    "minutes":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.minutes.integerValue,
                    "name":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.name.stringValue,
                    "servings":snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.servings.integerValue
            });
        }
        console.log(recipeList);
        return recipeList;
    }

    checkForUser(){
        if(this.user){
            // alert("You are already signed in! :)");
            $("#login").css("display", "none");
            $("#logout").css("display", "block");
            console.log(this.user.first_name);
            console.log(this.recipes);
            console.log(this.recipes[0].hours);
            console.log(this.recipes[0].doc.data.value.mapValue.fields.hours.integerValue);
            console.log(this.recipes[0].doc.data.value.mapValue.fields.minutes.integerValue);
            console.log($("#recipeTitle"));
            $("#userFNameTitle").html(this.user.first_name);
            $('#recipeTitle').html = this.recipes[0].doc.data.value.mapValue.fields.name.stringValue;
            $("#hoursVal").html = this.recipes[0].doc.data.value.mapValue.fields.hours.integerValue;
            $("#minutesVal").html = this.recipes[0].doc.data.value.mapValue.fields.minutes.integerValue;
            $('#servingsVal').html = this.recipes[0].servings;
        }else{
            if(window.location.hash == ''){
                // alert("Please log in or sign up for the full experience! :)");
            }
            $("#login").css("display", "block");
            $("#logout").css("display", "none");
            $("#userFNameTitle").html("user");
        }
    }

    async setUserDBInfo(ufn, uln, ue, up){
        console.log(this.userTable);
        await addDoc(collection(this.db, "User"), {
            first_name: ufn,
            last_name: uln,
            email: ue,
            password: up
        })
        .then((ref) => {
            // console.log(ref.uid);
        });
    }


    createUser(userFName, userLName, userEmail, userPassword){
        console.log("Hello from createUser();");
        createUserWithEmailAndPassword(this.auth, userEmail, userPassword)
        .then((userCred) => {
            // console.log(userCred.user.accessToken);
            this.setUserDBInfo(userFName, userLName, userEmail, userPassword);
            window.location.hash = 'YOURRECIPE';
            // this.loginUser(userCred);
        })
        .catch((error) =>{
            console.log(error);
            window.location.hash = 'LOGIN';
            alert("One of the parameters you entered did not verify. Please try again.");
        });
    }

    loginUser(userEmail, userPassword){
        signInWithEmailAndPassword(this.auth, userEmail, userPassword)
        .then((creds) => {
            alert("Signed in.");
            // console.log(creds.user.email);
            $("#login").css("display", "none");
            $("#logout").css("display", "block");

            // console.log("Hello before pullDBDate();");
            this.user = this.pullUserData(creds.user.email).then(() => {
                this.pullRecipeData().then(() => {
                    window.location.hash = 'YOURRECIPE';
                    $('#recipeTitle').html = this.recipes[0].name;
                    $('#hoursVal').html = this.recipes[0].hours;
                    $('#minutesVal').html = this.recipes[0].minutes;
                    $('#servingsVal').html = this.recipes[0].servings;
                });
                // window.location.hash = 'YOURRECIPE';
            });
        })
        .catch((error) => {
            console.log("Login fail.");
            $("#logout").css("display", "block");
            $("#login").css("display", "none");
            window.location.hash = 'LOGIN';
            alert("Your email or password was incorrect. Please try again.");
        });
    }

    logoutUser(){
        this.auth.signOut().then(() => console.log('User signed out!'));
        $("#login").css("display", "none");
        $("#logout").css("display", "block");
        window.location.hash = 'HOME';
    }

    testing(){
        console.log("Database: " + this.db);
        console.log("User: " + this.user);
        console.log("Auth: " + this.auth);
    }
}



































/*




    // userFName = "TestUser";
    // userLName;
    // userEmail;
        // console.log(snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.email.stringValue);
        // var ref = collection(this.db, "User");
        // this.pullUserData();
        // if(this.user.exists()){
        //     console.log(this.user.data());
        // }else{
        //     console.log("No data yet.")
        // }

        // this.testing();
        // this.checkForUser();
        // this.createUser();
        // this.loginUser("gdennett@codeflamestudio.com", "fineCheese");
        // return user;

        // console.log(snap._snapshot.docChanges[i].doc.data.value.mapValue.fields.email.stringValue);
        // if(snap.exists()){
        //     console.log(snap);
        //     return snap;
        // }else{
        //     console.log("No data yet.");
        // }

        // this.setUserDBInfo();

        // console.log(ref);


        // const ref = await addDoc(collection(this.db, this.userTable), {
        //     first_name: ufn,
        //     last_name: uln,
        //     email: ue,
        //     password: up
        //     // fName: "test",
        //     // lName: "user",
        //     // email: "testuser@email.com",
        //     // password: "rooter"
        // });
        // console.log(ref.id);
homeContent = `
    <div id="gallery">
        <div id="leftArrow" class="arrow">&#8592;</div>
        <div id="galleryContent">
            <div id="galleryTitle">Nintendo</div>
            <img id="galleryImage" src="assets/images/developers/nintendo.jpg" />
        </div>
        <div id="rightArrow" class="arrow">&#8594;</div>
    </div>
    `;


    browseContent = `
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

    createContent = `
    <div class="inputForm">
        <form id="inputSection" action="./server/processsignup.php" method="POST">
        <h1></h1>
            <div id="inputRow">

                <div id="dataPoint">

                    <p>First Name</p>

                    <input  type="text"  name="fname" required>

                </div>

                <div id="dataPoint">

                    <p>Last Name</p>

                    <input  type="text" name="lname" required>

                </div>

                <div id="dataPoint">

                    <p>Email</p>

                    <input  type="text"  name="email" required>

                </div>

                <div id="dataPoint">

                    <p>Password</p>

                    <input  type="password" name="passwd" required>

                </div>

                <div id="dataPoint">

                    <p>Favorite Book</p>

                    <input  type="text"  name="confirmpasswd" required>

                </div>

                <div id="dataPoint">

                <p>Favorite Genre</p>

                <input  type="text"  name="fname" required>

            </div>

            <div id="dataPoint">

                <p>Favorite Vehicle</p>

                <input  type="text" name="lname" required>

            </div>

            <div id="dataPoint">

                <p>Favorite Sport</p>

                <input  type="text"  name="email" required>

            </div>

            <div id="dataPoint">

                <p>Favorite Team</p>

                <input  type="password" name="passwd" required>

            </div>

            <div id="dataPoint">

                <p>Favorite Place</p>

                <input  type="text"  name="confirmpasswd" required>

            </div>

            </div>

            <button class="btnstyle submitbtn" type="submit" style="padding-top: 5px; cursor: pointer;" required>Create Account</button>

        </form>

    </div>
    `;


    galleryPage = `
    <div id="gallerySingle">
        <!-- <div id="leftArrow" class="arrow">&#8592;</div> -->
        <div id="galleryContentSingle">
            <div id="galleryTitle">Monster Hunter Rise</div>
            <img id="galleryImage" src="assets/images/mhrise.jpg" />
            <div id="galleryPublisher">Nintendo</div>
            <div id="galleryGenre">Fighting</div>
            <div id="galleryPlatforms">Switch/PS4/XBOX/PC</div>
        </div>
        <!-- <div id="rightArrow" class="arrow">&#8594;</div> -->
    </div>
    `;

    editContent = `
    <div class="inputForm">
    <form id="inputSection" action="./server/processsignup.php" method="POST">
    <h1></h1>
        <div id="inputRow">

            <div id="dataPoint">

                <p>First Name</p>

                <input  type="text"  name="fname" placeholder="${this.pageName}" required>

            </div>

            <div id="dataPoint">

                <p>Last Name</p>

                <input  type="text" name="lname" required>

            </div>

            <div id="dataPoint">

                <p>Email</p>

                <input  type="text"  name="email" required>

            </div>

            <div id="dataPoint">

                <p>Password</p>

                <input  type="password" name="passwd" required>

            </div>

            <div id="dataPoint">

                <p>Favorite Book</p>

                <input  type="text"  name="confirmpasswd" required>

            </div>

            <div id="dataPoint">

            <p>Favorite Genre</p>

            <input  type="text"  name="fname" required>

        </div>

        <div id="dataPoint">

            <p>Favorite Vehicle</p>

            <input  type="text" name="lname" required>

        </div>

        <div id="dataPoint">

            <p>Favorite Sport</p>

            <input  type="text"  name="email" required>

        </div>

        <div id="dataPoint">

            <p>Favorite Team</p>

            <input  type="password" name="passwd" required>

        </div>

        <div id="dataPoint">

            <p>Favorite Place</p>

            <input  type="text"  name="confirmpasswd" required>

        </div>

        </div>

        <button class="btnstyle submitbtn" type="submit" style="padding-top: 5px; cursor: pointer;" required>Create Account</button>

    </form>

</div>
    `;

    loginSignupContent = `
    <div id="loginSignupContainer">
            <div class="inputForm">

                <form id="loginForm" action="./server/processlogin.php" method="POST">

                    <h1>Login</h1><br>

                    <div id="dataPoint">

                        <p>Email</p>

                        <input type="text" name="loginemail" required>

                    </div>

                    <div id="dataPoint">

                        <p>Password</p>

                        <input type="text" name="loginpasswd" required><br><br>

                    </div>

                    <br>

                    <button class="btnstyle submitbtn" type="submit" style="padding-top: 5px; cursor: pointer;" required>Log in</button>

                </form>
            </div>
            <div class="inputForm">
                    <form id="inputSection" action="./server/processsignup.php" method="POST">
                    <h1>Sign-up</h1>
                        <div id="inputRow">

                        <div id="dataPoint">

                        <p>First Name</p>

                        <input  type="text"  name="fname" required>

                    </div>

                    <div id="dataPoint">

                        <p>Last Name</p>

                        <input  type="text" name="lname" required>

                    </div>

                            <div id="dataPoint">

                                <p>Email</p>

                                <input  type="text"  name="email" required>

                            </div>

                            <div id="dataPoint">

                                <p>Password</p>

                                <input  type="password" name="passwd" required>

                            </div>

                            <div id="dataPoint">

                                <p>Confirm Password</p>

                                <input  type="text"  name="confirmpasswd" required>

                            </div>

                        </div>

                        <button class="btnstyle submitbtn" type="submit" style="padding-top: 5px; cursor: pointer;" required>Sign up</button>

                    </form>

                </div>

            </div>

        </div>

        <br>

        </div>
        </div>
    `;



    defaultContent = this.homeContent;


*/