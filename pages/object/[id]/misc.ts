import {useNotifyStore} from "~/store/useNotify";

export const setFieldType = (selectedFieldType: any, fields: IFieldType[], modalType: boolean, id: number, max_hours: number) => {
    const temp_field_type = fields?.find(el => el.id === id)
    if(!temp_field_type) return

    selectedFieldType.id = id
    selectedFieldType.value = true
    selectedFieldType.max_hours = max_hours
    selectedFieldType.startFrom = parseInt(temp_field_type?.field.time_start.slice(0, 2) || '0')
    selectedFieldType.endTo = parseInt(temp_field_type?.field.time_end.slice(0, 2) || '0')
    selectedFieldType.lat = temp_field_type.lat
    selectedFieldType.lng = temp_field_type.lng
    selectedFieldType.field_id = temp_field_type.field.id
    selectedFieldType.address = temp_field_type.field.address
    modalType = false
}

export const cases = [
    {
        id: 1,
        icon: 'clock',
        name: 'Приходить за 30 минут до начала.'
    },
    {
        id: 2,
        icon: 'ball',
        name: 'Курить и пить спиртные напитки на территории запрещается.'
    },
    {
        id: 3,
        icon: 'trash',
        name: 'Не забудьте убрать весь мусор за собой'
    }
]

export const checkAccount = (phone: string, step: number) => {
    const _notify = useNotifyStore()

    myFetch(`/find-user/`, {
        method: 'POST',
        body: {
            phone: phone
        }
    })
        .then((res) => {
            step = 3
        })
        .catch(() => {
            _notify.addNotify('Такой пользователь уже существует')
        })
}

export const bookErrorHandler = (err: any, errorNum: number, req_id?: number) => {
    const _notify = useNotifyStore()
    _notify.addNotify(`Ошибка при создании заявки #${errorNum}`)
    console.log(err?.data?.detail)
    if(req_id)
        myFetch(`/requests/${req_id}/`, {method: 'DELETE'})
}

export async function createRequest(
                        dateTime: {date: string|null, time: string| null},
                        selectedFieldType: any,
                        is_auth: boolean,
                        user_info: IUserInfo,
                        phone: string,
                        otp: number,
                        login: string,
                        data: IField
) {
    try {
        const requestData = {
            date: dateTime.date,
            time: dateTime.time,
            field_type: selectedFieldType.id,
            duration: selectedFieldType.duration,
            user: is_auth ? user_info?.id : undefined,
            paid: false,
            book: true,
        };

        const response = await myFetch(`/requests/`, {
            method: "POST",
            body: requestData,
        });

        if (!is_auth) {
            // Создать пользователя и обновить user_info
            const userResponse = await myFetch(`/users/`, {
                method: 'POST',
                body: {
                    phone: phone,
                    password: otp,
                    name: login,
                }
            });

            // Обновить user_info
            user_info = userResponse._data as IUserInfo;

            // Произвести оплату
            // await pay(resFieldType.value?.coast * (selectedFieldType.value?.duration || 1));

            // Пометить запрос как оплаченный
            await myFetch(`/requests/${(response._data as IRequest)?.id}/`, {
                method: 'PATCH',
                body: {
                    "paid": true,
                },
            });
        } else {
            // Произвести оплату
            // await pay(resFieldType.value?.coast * (selectedFieldType.value?.duration || 1));

            // Пометить запрос как оплаченный
            await myFetch(`/requests/${(response._data as IRequest)?.id}/`, {
                method: 'PATCH',
                body: {
                    "paid": true,
                },
            });

            const owner_of_field = (await myFetch(`/find-user-by-id/?id=${data?.owner_id}`))._data as IUserInfo
            await myFetch(`/send-notify-to-user/`, {
                method: 'POST',
                body: {
                    "phone": owner_of_field.phone,
                    "title": "Новая бронь",
                    "body": `Новая бронь на поле: ${data?.name}`,
                    "sound": "default",
                    "badge": 1
                }
            })
        }
    } catch (err: any) {
        console.log(err)
        if (!is_auth)
            bookErrorHandler(err, 3, err?._data?.id);
        else
            bookErrorHandler(err, 1, err?._data?.id);
    }
}
