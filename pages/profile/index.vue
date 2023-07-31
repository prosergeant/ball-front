<template>
    <template v-if="is_auth">
        <div class="profile-wrapper">
            <div class="avatar-block">
                <div class="avatar">
                    <div class="avatar-wrapper">
                        <img :src="user_info?.photo ? `${baseUrl}${user_info?.photo}` : '/images/avatar.png'" alt="avatar" />
                    </div>
                    <img src="/icons/edit-image.svg" alt="edit-image" class="edit-image" @click="uploadFile" />
                    <input id="file" name="file" type="file" accept="image/*" @change="postAvatar" />
                </div>
            </div>
            <div class="profile">
                <h4>Обо мне</h4>

                <div class="info-blocks">
                    <div class="block"
                         v-for="i in profileInfo"
                         :key="i.id"
                    >
                        <span>{{ i.value }}</span>
                        <p>{{ i.name }}</p>
                    </div>
                </div>

                <div class="logout" @click="_logout">
                    <UIIcon icon="logout" color="green1" />
                    <p>Выйти из аккаунта</p>
                    <UIIcon icon="chevron-right" color="green1" />
                </div>
            </div>
        </div>
    </template>
    <div v-else></div>
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
#file {
    visibility: hidden;
    position: absolute;
    z-index: -1;
}
.avatar-block {
    width: 100%;
    height: calc(100% - var(--menu-block, 455px));
    display: flex;
    justify-content: center;
    align-items: center;

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