exports.insertSort = function(array = []) {
    /**
     * 二分插入法，当范围小于4时采用选择插入
     * @param {*} results 结果
     * @param {*} num 目标数
     * @param {*} startIndex 起始索引 默认为 0
     * @param {*} endIndex 结束索引 默认为 结果长度 - 1
     */
    function bisectionInsert(results = [], num, startIndex = 0, endIndex = results.length - 1) {
        // 如果结果中不存在数字，则直接插入
        if (results.length === 0) {
            results.push(num);
        } else {
            // 计算差值，如果范围小于4，则进行选择插入
            const dt = (endIndex - startIndex);

            if (dt <= 4) {
                // 如果数字大于最后一个结果
                if (num >= results[endIndex]) {
                    // 则直接插入末尾
                    results.splice(endIndex + 1, 0, num);
                } else {
                    // 否则从头开始遍历，直到找到自己合适的位置
                    for (let i = startIndex; i <= endIndex; i++) {
                        if (num < results[i]) {
                            results.splice(i, 0, num);
                            break;
                        }
                    }
                }
            } else {
                if (dt % 2 === 0) {
                    // 如果差值是个偶数，则确定中间的两个点
                    const centerRightIndex = startIndex + dt / 2;
                    const centerLeftIndex = centerRightIndex - 1;
                    const centerRightNum = results[centerRightIndex];
                    const centerLeftNum = results[centerLeftIndex];

                    if (num > centerRightNum) {
                        // 如果数字大于右侧较大的数字，则缩小范围进行下一轮二分
                        results = bisectionInsert(results, num, centerRightIndex + 1);
                    } else if (num < centerLeftNum) {
                        // 如果数字小于左侧较小的数字，则缩小范围进行下一轮二分
                        results = bisectionInsert(results, num, startIndex, centerLeftIndex - 1);
                    } else {
                        // 如果处于中间位置，则直接插入
                        results.splice(centerRightIndex, 0, num);
                    }
                } else {
                    // 如果是奇数，则确定中间点
                    const centerIndex = startIndex + (dt - 1) / 2;
                    const centerNum = results[centerIndex];

                    if (num > centerNum) {
                        // 如果数字大于中间的数字，则缩小范围进行下一轮二分
                        bisectionInsert(results, num, centerIndex + 1);
                    } else if (num < centerNum) {
                        // 如果数字小于中间的数字，则缩小范围进行下一轮二分
                        bisectionInsert(results, num, startIndex, centerIndex - 1);
                    } else {
                        // 如果处于中间位置，则直接插入
                        results.splice(centerIndex + 1, 0, num);
                    }
                }
            }
        }
        return results;
    }

    // const startT = Date.now();

    const _results = array.reduce((r, num) => {
        return bisectionInsert(r, num);
    }, []);

    // console.log('算法结束，耗时：', Date.now() - startT, 'ms');
    // console.log(`\n输入：\n${JSON.stringify(array)}\n输出：\n${JSON.stringify(_results)}\n\n`);

    return _results;
}