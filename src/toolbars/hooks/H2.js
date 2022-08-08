/**
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import MenuBase from '@/toolbars/MenuBase';
import { getSelection } from '@/utils/selection';
/**
 * 插入2级标题
 */
export default class H2 extends MenuBase {
  constructor($cherry) {
    super($cherry);
    this.setName('h2', 'h2');
  }

  /**
   * 响应点击事件
   * @param {string} selection 被用户选中的文本内容
   * @param {string} shortKey 快捷键参数，本函数不处理这个参数
   * @returns {string} 回填到编辑器光标位置/选中文本区域的内容
   */
  onClick(selection, shortKey = '') {
    const $selection = getSelection(this.editor.editor, selection, 'line', true) || '标题';
    // 如果有选中的内容，则根据选中的内容进行判断
    if (/^\s*(#+)\s*.+/.test($selection)) {
      // 如果选中的内容里有标题语法，并且标记级别与目标一致，则去掉标题语法
      // 反之，修改标题级别与目标一致
      let needClean = true;
      const tmp = $selection.replace(/(^\s*)(#+)(\s*)(.+$)/gm, (w, m1, m2, m3, m4) => {
        needClean = needClean ? m2 === '##' : false;
        return `${m1}##${m3}${m4}`;
      });
      return !needClean ? tmp : $selection.replace(/(^\s*)(#+)(\s*)(.+$)/gm, '$1$4');
    }
    return $selection.replace(/(^)([\s]*)([^\n]+)($)/gm, '$1## $3$4');
  }
}
