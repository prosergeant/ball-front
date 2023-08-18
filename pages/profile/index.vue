<template lang="jade">

template(v-if="is_auth")
    .new-profile-head
        h4 Профиль
        .avatar-block
            .avatar
                .avatar-wrapper
                    img(:src="user_info?.photo ? `${baseUrl}${user_info?.photo}` : '/images/avatar.png'" alt="avatar")
                img.edit-image(src="/icons/edit-image.svg" alt="edit-image" @click="uploadFile")
                input(id="file" name="file" type="file" accept="image/*" @change="postAvatar")
        h3 {{ user_info?.name }}

        UIProfileButton(icon="user" text="Личная информация")
        UIProfileButton(icon="user" text="Данные карт")
        UIProfileButton(icon="user" text="Язык")
        UIProfileButton(icon="user" text="Стать партнером")

        .help
            h2 Поддержка

        UIProfileButton(icon="user" text="Служба поддержки")
        UIProfileButton(icon="user" text="Часто задаваемые вопросы")
        UIProfileButton(icon="user" text="Условия предоставления услуг")
        UIProfileButton(icon="user" text="Политика конфиденциальности")

        UIButton(style="width: 100%; justify-content: center;" @click="_logout") Выйти
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {logout} = authStore()

const {is_auth, user_info} = storeToRefs(authStore())
const router = useRouter()

const profileInfo = ref([
    {
        id: 1,
        name: 'Возраст',
        value: 18
    },
    {
        id: 2,
        name: 'Сыграно игр',
        value: 0
    },
    {
        id: 3,
        name: 'Победы',
        value: 0
    },
    {
        id: 4,
        name: 'S/L',
        value: 0
    },
])

const _logout = () => {
    logout()
    navigateTo('/')
}

const uploadFile = () => {
    const fileEl = document.getElementById('file')
    if(!fileEl) return
    fileEl.click()
}

const postAvatar = (e: HTMLInputElement) => {
    const fileEl = document.getElementById('file') as HTMLInputElement
    if(!fileEl) return

    const formData = new FormData();
    const img = fileEl.files?.[0];
    if(!img) return

    formData.append('image', img, img.name);
    myFetch(`/set-new-image/`, {
        method: 'POST',
        body: formData,
    })
        .then(() => {
            window.location.reload()
        })
}

onMounted(() => {
    setTimeout(() => {
        if(!is_auth.value) {
            navigateTo('/auth/')
        } else {
            myFetch(`/user-info/`)
                .then((res) => {
                    user_info.value = res._data as typeof user_info.value
                    localStorage.setItem('user', JSON.stringify(user_info.value))
                })
        }
    }, 0)
})
</script>

<style scoped lang="scss">
.new-profile-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0 0 0;
    color: white;

    .help {
        width: 100%;
        h2 {
            font-weight: 500;
            font-size: 20px;
            padding: 10px 0 0 0;
        }
    }

}

#file {
    visibility: hidden;
    position: absolute;
    z-index: -1;
}
.avatar-block {
    width: 100%;
    height: calc(100% - var(--menu-block, 455px));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        font-weight: 600;
    }

    .avatar {
        position: relative;
        .edit-image {
            position: absolute;
            bottom: 0;
            right: 10px;
            width: 34px;
            height: 34px;
        }
        .avatar-wrapper {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 2px solid $green1;
            overflow: hidden;
            img {
                object-fit: cover;
                width: 110px;
                height: 110px;
            }
        }
    }
}
.profile-wrapper {
    padding: 0 28px;
    height: 100dvh;


    .profile {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 455px;

        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 25px;

        border: 1px solid rgba(255, 255, 255, 0.20);

        background: black;
        backdrop-filter: blur(20px);

        h3 {
            color: white;
        }

        h4 {
            color: white;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        p {
            color: white;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}
.info-blocks {

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 18px;

    .block {
        display: flex;
        padding: 14px 12px;
        flex-direction: column;
        align-items: center;
        gap: 9px;

        border-radius: 24px;
        background: $black2;
        backdrop-filter: blur(20px);

        span {
            color: $green1;
            text-align: center;
            font-size: 42px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
        p {
            color: white;
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
}
.logout {
    display: flex;

    &:first-child {
        margin-right: 16px;
    }
    p {
        margin-right: auto;
    }
}
</style>
