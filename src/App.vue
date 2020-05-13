<template>
    <div id="app" class="container">
        <div class="row justify-content-center">
            <div class="col-7">
                <div class="row">
                    <div 
                        v-for="page in pages"
                        :key="page.order"
                        class="col-6 page_changer"
                    >{{ page.order }}</div>
                </div>
                <UserList 
                    v-for="page in pages"
                    :key="page.order"
                    :pageNumber="page.order"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserList from './components/UserList.vue'

@Component({
    components: {
        UserList
    }
})
export default class App extends Vue {
    public pages: Record<string, any>[] = [
        { order: 1 },
        { order: 2 }
    ]
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    & .page_changer {
        padding: 0.5rem;
        text-align: center;
        border-bottom: 2px solid transparent;
        &:hover, &.active {
            background-color: #dfdfdf;
            border-color: #919191;
            cursor: pointer;    
        }
    }
}
</style>
