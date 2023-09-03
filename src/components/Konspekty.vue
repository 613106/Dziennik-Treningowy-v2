<template>
    <div class="card">
        <div class="top">
            <p>Dodaj konspekt</p>
        </div>
    <div class="drag-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
    <span v-if="!isDragging" style="font-size: 36px;">
        Upuść konspekt tutaj albo
        <span class="select" role="button" @click="selectFiles" style="font-size: 36px;">
            Wybierz
        </span>
    </span>
    <div v-else class="select">Upuść konspekt tutaj</div>
    <input name="file" type="file" class="file" ref="fileInput" multiple @change="onFileSelect"/>
    </div>
    <div class="container">
        <div class="image" v-for="(images, index) in images" :key="index">
            <span class="delete" @click="deleteImage(index)">&times;</span>
            <img :src="images.url"/>
        </div>
    </div>
    <button type="button">Wgraj</button>
</div>
<div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9ff80] to-[#04822a] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      </div>
</template>

<script>
export default (await import('vue')).defineComponent({
    data(){
        return {
          images: [],
          isDragging: false 
         }
       },
    methods: {
        selectFiles() {
            this.$refs.fileInput.click();
        },
        onFileSelect(event){
            const files = event.target.files;
            if(files.length === 0) return;
            for (let i = 0; i < files.length; i++){
                if(files[i].type.split("/")[0] !="image") continue;
                if(!this.images.some((e) => e.name === files[i].name)){
                    this.images.push({name: files[i].name, url:URL.createObjectURL(files[i])});
                }
            }
        },
        deleteImage(index){
            this.images.splice(index, 1);
        },
        onDragOver(event){
            event.preventDefault();
            this.isDragging = true;
            event.dataTransfer.dropEffect = "copy";
        },
        onDragLeave(event){
            event.preventDefault();
            this.isDragging = false;
        },
        onDrop(event){
            event.preventDefault();
            this.isDragging = false;
            const files = event.dataTransfer.files;
            for (let i = 0; i < files.length; i++){
                if(files[i].type.split("/")[0] !="image") continue;
                if(!this.images.some((e) => e.name === files[i].name)){
                    this.images.push({name: files[i].name, url:URL.createObjectURL(files[i])});
                }
            }
        }
    }   
    })
</script>

<style>
.card{
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 5px #ffdfdf;
    border-radius: 5px;
    overflow: hidden;
}
.card .top{
    text-align: center;
}
.card p{
    font-weight: bold;
    color: #166534;
}
.card button{
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    width: 100%;
    background: #166534;
    margin-top: 20px;
}
.card .drag-area {
  height: 300px;
  border-radius: 5px;
  border: 2px dashed #166534;
  background: #fff;
  color: #166534;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  -webkit-user-select: none;
  margin-top: 10px;
}
.card .drag-area .visible{
    font-size: 36px;
}
.card .select{
    color: #4ade80;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
}
.card .select:hover{
    opacity: 0.6;
}
.card .container{
    width: 100%;
    height:auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
    padding-top: 15px;
}
.card .container .image{
    width: 200px;
    margin-right: 5px;
    height: 200px;
    position: relative;
    margin-bottom: 20px;
}
.card .container .image img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.card .container .image span{
    position: absolute;
    top: -2px;
    right: 9px;
    font-size: 25px;
    cursor: pointer;
}
.card input,
.card .drag-area .on-drop,
.card .drag-area.dragover .visible{
    display: none;
}
.delete{
 z-index: 999;
 color: #166534;
}
</style>