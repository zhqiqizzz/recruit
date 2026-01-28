import { http, delay } from "msw";
import { pinyin } from "pinyin-pro";
import provinces from "@province-city-china/province";
import cities from "@province-city-china/city";
import { success } from "@/mocks/utils";

// 定义数据结构
interface CityItem {
  code: string;
  name: string;
}

// 核心转换函数
const transformToGroup = () => {
  const result: Record<string, CityItem[]> = {
    热门: [],
  };

  const directCities = provinces.filter((p) =>
    ["110000", "120000", "310000", "500000"].includes(p.code)
  );
  const specialCities = provinces.filter((p) =>
    ["810000", "820000"].includes(p.code)
  );
  const allCityData = [...directCities, ...cities, ...specialCities];

  const hotCodes = [
    "110000",
    "310000",
    "440100",
    "440300",
    "330100",
    "510100",
    "420100",
    "610100",
  ];
  hotCodes.forEach((code) => {
    const city = allCityData.find((c) => c.code === code);
    if (city) {
      result["热门"]?.push({ code: city.code, name: city.name });
    }
  });

  // 自动 A-Z 分组
  allCityData.forEach((city) => {
    if (city.name.includes("行政区划")) return;

    const pinyinArr = pinyin(city.name, {
      pattern: "first",
      toneType: "none",
      type: "array",
    });
    if (!pinyinArr || pinyinArr.length === 0) return;

    // 校验是否为有效字母
    const firstLetter = pinyinArr[0]?.toUpperCase();
    if (!firstLetter || !/[A-Z]/.test(firstLetter)) return;
    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }
    result[firstLetter]?.push({
      code: city.code,
      name: city.name,
    });
  });

  const orderedResult: Record<string, CityItem[]> = {};
  const hotList = result["热门"];
  if (hotList && hotList.length > 0) {
    orderedResult["热门"] = hotList;
  }
  // 处理 A-Z
  Object.keys(result)
    .sort()
    .forEach((key) => {
      if (key !== "热门") {
        const list = result[key];
        if (list) {
          orderedResult[key] = list;
        }
      }
    });

  return orderedResult;
};
// 缓存计算结果
const cachedCityData = transformToGroup();

export const cityHandlers = [
  http.get("/api/sys/city/list", async () => {
    await delay(300);
    return success(cachedCityData);
  }),
];
