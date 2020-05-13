<template>
    <div class="d-flex flex-column">
        <div v-if="loading" class="loading"></div>
        <div v-else>
            <UserCard 
                v-for="user in users"
                :key="user.id"
                :user="user"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DataAccessService } from '@/services/DataAccess.service'
import { ConnectionService } from '@/services/Connection.service'
import UserCard from './UserCard.vue'

const resource = ConnectionService.getRootUrl()

@Component({
    components: {
        UserCard
    }
})
export default class UserList extends Vue {

    @Prop()
    private pageNumber!: number

    fetchData: any;
    users: Record<string, any>[] = []
    loading = false

    async getUsers() {
        this.loading = true
        this.fetchData = await DataAccessService.get(`${resource}users?page=${this.pageNumber}&delay=3`)
        this.users = this.fetchData.data
        this.loading = false
    }
    
    mounted() {
        this.getUsers()
    }
}
</script>

<style lang="scss" scoped>
.loading {
    width: 100px;
    height: 100px;
    border: 3px solid rgba(33, 33, 33, 0.5);
    border-radius: 50%;
    border-right: none;
    border-bottom: none;
    animation: loading 1s infinite ease;
}
@keyframes loading {
    0% {
        transform: rotate(360deg)
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>