<template>
    <div class="pager-left" v-if="pag_show">
        <span>每页显示：</span>
        <select id="pager-size" @change="change_size">
            <option value="10">每页显示10条</option>
            <option value="20">每页显示20条</option>
            <option value="50">每页显示50条</option>
        </select>
    </div>
    <div class="pagination_content" style="text-align: right;margin-top: 10px;">
        <el-pagination
            v-if="pag_show"
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next,total, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {

    }
</script>
<style>

</style>
