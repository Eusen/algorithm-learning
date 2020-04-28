describe('排序测试', () => {
    const sort = require('./sort');
    
    const testArrays = [];
    const targetArrays = [];

    beforeEach(() => {
        jasmine.addMatchers({
            toBeSortCorrect(util, customEqualityTesters) {
                return {
                    compare(actual, expected) {
                        const pass = compare(actual.output, actual.index);

                        let message = '';
                        
                        if (pass) {
                            message = '验证通过';
                        } else {
                            message = `\n验证不通过，排序算法有问题!\n输入：\n${JSON.stringify(actual.input)}\n输出：\n${JSON.stringify(actual.output)}\n\n`
                        }
                        
                        return {
                            pass,
                            message,
                        }
                    }
                }
            }
        })

        for (let i = 0; i < 50; i++) {
            testArrays[i] = [];
            const arrayLength = 5 + parseInt(Math.random() * 50, 10);
            for (let index = 0; index < arrayLength; index++) {
                testArrays[i].push(parseInt(Math.random() * 100, 10));
            }
            targetArrays[i] = {array: JSON.parse(JSON.stringify(testArrays[i])).sort((a, b) => a - b)};
            targetArrays[i].json = JSON.stringify(targetArrays[i].array);
        }
    });

    function compare(results, index) {
        return targetArrays[index].json === JSON.stringify(results);
    }


    it('插入排序测试', () => {
        testArrays.forEach((input, index) => {
            const output = sort.insertSort(input);
            
            expect({ input, output, index }).toBeSortCorrect();
        });
    });
});