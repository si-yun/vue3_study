import { ref, computed } from 'vue';

export const useList = () => {
    const text = ref("");
    const search = ref("");
    const toDoList = ref([]);
    //ref사용해서 변수를 담아주고 리턴을 하면  App.vue template 에서 사용할수있음 
    //ref를 사용하기 위해서  변수를 적고 뒤에 .value를 같이 사용해줘야함  .value를 통해서 value를 가져오기때문에 
    //.value로 변수를 담았기떄문에 this.는 사용할 필요가없음. 
    //computed=-------------------------------------------------------
    const filteredList = computed(() => {
        return toDoList.value.filter(toDo => toDo.text.includes(search.value)) //reactivity를 유지하기 위해서 기본자료형은 .value를 같이 적어줘야함  
    });
    const checkIfAlreadyExists = computed(() => {
        return toDoList.value.some(toDo => toDo.text.trim() === text.value.trim());
    });
    // computed: {
    // }   8~12번줄 같은거 


    // methods -------------------------------------------------------
    //computed를 사용할때도 this.는 사용하지 않고 .value를 사용해줌. 
    const addToDo = () => {
        if (!checkIfAlreadyExists.value) {
            toDoList.value.push({
                createdAt: new Date().getTime(),
                done: false,
                text: text.value
            });
            text.value = "";
        }
    };

    const deleteToDo = (createdAt) => {
        const index = toDoList.value.findIndex(
            toDo => toDo.createdAt === createdAt
        );

        toDoList.value.splice(index, 1);


    };
    return {
        text,
        search,
        toDoList,
        filteredList,
        checkIfAlreadyExists,
        addToDo,
        deleteToDo
    };

};