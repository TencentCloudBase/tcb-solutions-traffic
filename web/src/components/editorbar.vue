<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
// @ts-ignore
import E, { Wangeditor } from "wangeditor";

@Component({})
export default class extends Vue {
  @Prop()
  value!: string;

  @Watch("value")
  onValueChanged(val: string) {
    this.editor.txt.html(val);
  }

  editor: any;
  initEditor() {
    this.editor = new E(this.$refs.toolbar, this.$refs.editor);
    this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
    this.editor.customConfig.uploadImgServer = ""; // 配置服务器端地址
    this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
    this.editor.customConfig.uploadFileName = ""; // 后端接受上传文件的参数名
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
    this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
    this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
    // 配置菜单
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.uploadImgHooks = {
      fail: (xhr: any, editor: any, result: any) => {
        // 插入图片失败回调
      },
      success: (xhr: any, editor: any, result: any) => {
        // 图片上传成功回调
      },
      error: (xhr: any, editor: any) => {
        // 图片上传错误的回调
      }
    };
    this.editor.customConfig.onchange = (html: string) => {
      this.$emit("input", html); // 将内容同步到父组件中
    };
    // 创建富文本编辑器
    this.editor.create();
  }
  mounted() {
    this.initEditor();
  }
}
</script>
<style lang="css">
.editor {
  margin: 0 auto;
}
.toolbar {
  border: 1px solid #dcdfe6;
  border-bottom: none;
}
.text {
  border: 1px solid #dcdfe6;
  min-height: 200px;
}
</style>
