<template>
    <div class="user_card d-flex">
        <div class="user_card-image">
            <img :src="user.avatar" alt="avatar" class="img-fluid" @click="dialog = true">
        </div>
        <div class="user_card-info">
            <div>
                <h3>
                    {{ user.first_name }} {{ user.last_name }}
                </h3>
            </div>
            <div class="text-secondary">
                {{ user.email }}
            </div>
        </div>
        <UserInfo 
            :user="user"
            :dialog="dialog"
            @onDialogClose="closeDialog"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import UserInfo from './UserInfo.vue'

@Component({
    components: {
        UserInfo
    }
})
export default class UserCard extends Vue {

    @Prop()
    private user!: any

    public dialog = false

    closeDialog() {
        this.dialog = false
    }
    
}
</script>

<style lang="scss" scoped>
.user_card {
    margin: 1rem 0;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    &>.user_card-image {
        margin-right: 0.5rem;
        &>img {
            border-radius: 5px 0 0 5px;
            cursor: pointer;
        }
    }
    &>.user_card-info {
        padding: 1rem;
    }
}
</style>