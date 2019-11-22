export default {
  data(){
    return{
      msg: '我是mixins的数据'
    }
  },
  methods: {
    _chunk(target, size){
      if(!Array.isArray(target) || size <=0 || !target.length){
        return target
      }
      let arr = [...target]
      let result = []
      while (arr.length > size){
        result.push(arr.splice(0, size))
      }
      result.push(arr)
      return result
    }
  }
}
