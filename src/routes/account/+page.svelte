<svelte:head>
    <title>Molai's Image Search</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow-x: hidden;
        }
    </style>
</svelte:head>

<script>
    import Home from "carbon-icons-svelte/lib/Home.svelte";
    import * as firebase from 'firebase/app';
    import * as au from 'firebase/auth';
    import { onMount } from 'svelte';

    const firebaseConfig = {
      apiKey: "AIzaSyAbbrfcYQqvzlx_qLdrHEM9J61qstAftXI",
      authDomain: "molai-image-sear-1661363495487.firebaseapp.com",
      projectId: "molai-image-sear-1661363495487",
      storageBucket: "molai-image-sear-1661363495487.appspot.com",
      messagingSenderId: "346745566394",
      appId: "1:346745566394:web:cd7047421bbc2ffc93fe83",
      measurementId: "G-DWLGVWP7ZC"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = au.getAuth();

    async function loginWithGoogle() {
        try {
          const provider = new au.GoogleAuthProvider();

          const result = await au.signInWithPopup(auth, provider);
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
    }

    async function signout() {
        auth.signOut();
        window.location.reload();
    }
</script>

<div class="container">
    <nav id="nav">
        <h1 on:click={() => window.location.href = '/'}>MIS</h1>
        <div class="links">
            <div on:click={() => window.location.href = '/'} class="myaccount">
                <Home size={38} />
                <span>Home</span>
            </div>
        </div>
    </nav>
    <h1 class="head">My Account</h1>
    {#if auth.currentUser === null}
        <section class="loginArea">
            <h2>You aren't logged in.</h2>
            <button class="action" on:click={() => loginWithGoogle()}>Sign In With Google</button>
        </section>
    {:else}
        <section class="loginArea">
            <h2>Logged in as {auth.currentUser.displayName}</h2>
            <button class="action" on:click={() => signout()}>Sign Out</button>
        </section>
    {/if}
    <footer>
        <span>Made with ❤ by <a class="fx" href="https://molai.dev/">molai.dev</a> →</span>
    </footer>
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');

    $bg: #CED4DA;
    $form: #dee2e6;
    $font: 'IBM Plex Mono', monospace;
    $bold: 700;
    $regular: 400;
    $accent: #212529;

    .fx {
        border: none;
        display: inline;
        position: relative;
        cursor: pointer;

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #0087ca;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
        }

        &:hover:after{
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }

    footer {
        width: 100vw;
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 25px;
        margin-top: 25px;

        span {
            font-size: 24px;
            color: $accent;

            a {
                text-decoration: none;
            }
        }
    }

    .container {
        width: 100vw;
        height: 200vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $bg;
        font-family: $font;

        nav {
            width: 100vw;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 50px;
            font-family: $font;

            h1 {
                font-size: 36px;
                cursor: pointer;
            }

            .links {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                gap: 14px;

                .myaccount {
                    background: none;
                    border: none;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    gap: 7px;

                    span {
                        font-size: 22px;
                        font-family: $font;
                    }
                }
            }
        }

        .head {
            font-size: 72px;
            margin: 65px;
            color: $accent;
            min-height: 100px;
        }
    }

    .loginArea {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        height: 200px;

        .action {
            color: $bg;
            background: $accent;
            font-family: $font;
            font-size: 20px;
            cursor: pointer;
            border-radius: 15px;
            height: 70px;
            width: 160px;
            transition: 600ms ease-in-out;
            border: none;

            &:hover {
                color: $accent;
                background: $form;
                box-shadow: 10px 10px 5px 0px rgba(79,76,76,0.68);
                -webkit-box-shadow: 10px 10px 5px 0px rgba(79,76,76,0.68);
                -moz-box-shadow: 10px 10px 5px 0px rgba(79,76,76,0.68);
            }
        }
    }
</style>