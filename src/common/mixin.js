import {debounce} from 'common/utils.js'
import {TOP_DISTANCE} from "./const";
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";


export const itemListenerMixin = {
	data(){
    return{
      itemImgListener:null
		}
	},
	mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () =>{
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)

  }
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShow: false
		}
	},
	methods: {
		backTop() {
			this.$refs.scroll.scrollTo(0, 0, 1000)
		}
	}
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
			console.log(this.currentType);
		}
	}
}