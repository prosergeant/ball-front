<template lang="jade">

template(v-if="is_auth")

    .black-profile
        h4 Профиль
        .avatar-block
            .avatar
                .avatar-wrapper
                    img(:src="user_info?.photo ? remakeUrl(`${baseUrl}${user_info?.photo}`) : '/images/avatar.png'" alt="avatar")
                img.edit-image(src="/icons/edit-image.svg" alt="edit-image" @click="uploadFile")
                input(id="file" name="file" type="file" accept="image/*" @change="postAvatar")
        h3 {{ user_info?.name }}

        .black-profile-btns
            UIProfileButton(icon="user" text="Стать партнером", link="/profile/partner/")

        .black-profile-btns
            UIProfileButton(icon="user" text="Служба поддержки", link="/profile/helpdesk/" )
            UIProfileButton(icon="user" text="Агентский договор Вronkz" link="/pdf/agent-contract.pdf" is-pdf)
            UIProfileButton(icon="user" text="Политика конфиденциальности" link="/pdf/privacy-policy.pdf" is-pdf )
            UIProfileButton(icon="user" text="Публичная оферта" link="/pdf/public-offer.pdf" is-pdf )
            UIProfileButton(v-if="user_info?.is_owner" icon="user" text="Админ панель" link="/profile/admin" )

        UIButton(style="width: 100%; justify-content: center; margin-top: auto;" @click="_logout") Выйти
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {authStore} from "~/store/auth";
import {useRouter} from "vue-router";

const {logout} = authStore()

const {is_auth, user_info} = storeToRefs(authStore())
const router = useRouter()

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
.black-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 14px 0 14px;
    color: white;
    height: calc(100dvh - 80px);

    &-btns {
        width: 100%;
        background: #33333388;
        padding: 8px 12px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        & > div {
            &:not(:last-child) {
                padding-bottom: 10px;
                border-bottom: 1px solid #333;
            }
        }
    }
}
.new-profile-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 14px 0 14px;
    color: white;
    height: calc(100dvh - 80px);

    .help {
        width: 100%;
        h2 {
            font-weight: 500;
            font-size: 20px;
            padding: 10px 0 0 10px;
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
</style>
