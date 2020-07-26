import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

// class-style
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  count: number = 20;

  render(h: CreateElement) {
  return <div onClick={this.onClick}>{this.msg}<p>{this.count}</p></div>
  }

  onClick()  {
    console.log('TsxCompTsxCompTsxComp')
    this.count += 20
  }
}