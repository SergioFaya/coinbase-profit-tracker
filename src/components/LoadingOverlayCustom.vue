<template>
<div class="vld-parent">
    <loading :active.sync="isLoading" :can-cancel="false" :on-cancel="onCancel" :is-full-page="true"></loading>
</div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'loading-overlay-custom',
    props: ['isLoading'],
    data() {
        return {
            fullPage: true
        }
    },
    components: {
        Loading
    },
    methods: {
        onCancel() {
            console.log('User cancelled the loader.')
        }
    }
}
</script>
