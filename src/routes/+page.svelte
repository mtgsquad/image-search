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

<script lang="ts">
    import Search from "carbon-icons-svelte/lib/Search.svelte";
    import UserAvatarFilled from "carbon-icons-svelte/lib/UserAvatarFilled.svelte";
    import { page } from '$app/stores'
    const apikey = import.meta.env.VITE_APIKEY;

    let search: string;
    let showRes: boolean = false;
    let form: HTMLFormElement;
    let formInput: HTMLInputElement;
    let head: HTMLElement;
    let container: HTMLDivElement;

    let items: any[] = [];

    async function formSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        
        const reqURI = `https://customsearch.googleapis.com/customsearch/v1/?q=${search}&searchType=image&imgSize=medium&key=${apikey}&cx=31a951382d1ca4463`;

        const res = await fetch(reqURI, {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json());

        console.log(res);
        res.items.forEach((item: any) => {
            items.push(item);
        });

        try {
            showRes = true;
            showRes = false;
            showRes = true;
        } catch (err) {
            throw err;
        }

        form.style.width = "650px";
        formInput.style.display = "block";
        container.style.height = 'auto';
    }
</script>

<div bind:this={container} class="container">
    <nav id="nav">
        <h1 on:click={() => window.location.href = '#nav'}>MIS</h1>
        <div class="links">
            <div class="myaccount">
                <UserAvatarFilled size={38} />
                <span>My Account</span>
            </div>
        </div>
    </nav>
    <h1 bind:this={head} class="head">Molai's Image Search</h1>
    <form bind:this={form} on:submit={(ev) => formSubmit(ev)}>
        <button type="submit">
            <Search size={44} />
        </button>
        <input bind:this={formInput} bind:value={search} placeholder="Search for an image..." type="text" class="searchbar">
    </form>
    <section class="searchResults">
        {#if showRes}
            {#each items as item}
                <div on:click={() => window.open(item.image.contextLink)} class="item">
                    <h2>{item.title}</h2>
                    <img src={item.link} alt="Result Image">
                    <span>{item.displayLink}</span>
                </div>
            {/each}
        {/if}
    </section>
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

        form {
            width: 100px;
            min-height: 100px;
            background-color: $form;
            position: relative;
            display: flex;
            align-items: center;
            flex-direction: row;
            transition: 0.8s;
            padding: 15px;
            overflow: hidden;
            margin-bottom: 75px;
            box-shadow: 10px 10px 5px 0px rgba(196,203,210,0.75);
            -webkit-box-shadow: 10px 10px 5px 0px rgba(196,203,210,0.75);
            -moz-box-shadow: 10px 10px 5px 0px rgba(196,203,210,0.75);

            .searchbar {
                display: none;
                transition: 0.8s;
                background: none;
                border: none;
                margin-left: 25px;
                font-size: 24px;
                font-family: $font;
                outline: none;
                width: auto;
            }

            &:hover {
                .searchbar {
                    display: block;
                }

                width: 650px;
            }

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background: linear-gradient(#fff,#fff,#e3e3e3);
                z-index: 1;
                filter: blur(1px);
            }
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: -1px;
                width: 10px;
                height: 100%;
                background: #9d9d9d;
                z-index: 1;
                filter: blur(1px);
            }

            button {
                background: none;
                border: none;
                border-radius: 50px;
                color: $accent;
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }

    .searchResults {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-left: 175px;
        padding-right: 175px;

        .item {
            width: 300px;
            height: 450px;
            box-shadow: 0 5px 5px 0px rgba(0,0,0,0.25);
            -webkit-box-shadow: 0 5px 5px 0px rgba(0,0,0,0.25);
            -moz-box-shadow: 0 5px 5px 0px rgba(0,0,0,0.25);
            background-color: lighten($accent, 55%);
            margin: 15px;
            border-radius: 15px;
            padding: 40px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

            h2 {
                font-size: 18px;
            }

            span {
                font-size: 14px;
            }
            
            img {
                width: 250px;
                border-radius: 8px;
                max-height: 250px;
            }
        }
    }
</style>