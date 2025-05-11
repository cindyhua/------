### 1. 用户认证API

#### 1.1 用户注册

**接口**: `/auth/register`
**方法**: POST
**说明**: 注册新用户账号

**请求参数**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "张三",
  "gender": "male",
  "birthDate": "1990-01-01",
  "deviceId": "device12345",
  "agreeToTerms": true
}
```

**响应**:
```json
{
  "status": 201,
  "message": "用户注册成功",
  "data": {
    "userId": "user12345",
    "email": "user@example.com",
    "name": "张三",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "createdAt": "2023-06-15T08:30:00Z",
    "requiresEmailVerification": true
  }
}
```

#### 1.2 用户登录

**接口**: `/auth/login`
**方法**: POST
**说明**: 用户账号登录

**请求参数**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "deviceId": "device12345"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "登录成功",
  "data": {
    "userId": "user12345",
    "name": "张三",
    "email": "user@example.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "lastLogin": "2023-06-15T08:30:00Z"
  }
}
```

#### 1.3 刷新令牌

**接口**: `/auth/refresh`
**方法**: POST
**说明**: 使用刷新令牌获取新的访问令牌

**请求参数**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应**:
```json
{
  "status": 200,
  "message": "令牌刷新成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

#### 1.4 邮箱验证

**接口**: `/auth/verify-email`
**方法**: POST
**说明**: 验证用户邮箱

**请求参数**:
```json
{
  "verificationToken": "abcdef123456",
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "邮箱验证成功",
  "data": {
    "verified": true,
    "email": "user@example.com"
  }
}
```

#### 1.5 找回密码

**接口**: `/auth/forgot-password`
**方法**: POST
**说明**: 发送密码重置邮件

**请求参数**:
```json
{
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "密码重置邮件已发送",
  "data": {
    "email": "user@example.com",
    "expiresIn": 3600
  }
}
```

#### 1.6 重置密码

**接口**: `/auth/reset-password`
**方法**: POST
**说明**: 使用重置令牌设置新密码

**请求参数**:
```json
{
  "resetToken": "abcdef123456",
  "email": "user@example.com",
  "newPassword": "NewSecurePassword123"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "密码重置成功",
  "data": {
    "email": "user@example.com",
    "passwordUpdatedAt": "2023-06-15T09:30:00Z"
  }
}
```

#### 1.7 登出

**接口**: `/auth/logout`
**方法**: POST
**说明**: 用户登出并使当前令牌失效

**请求参数**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应**:
```json
{
  "status": 200,
  "message": "登出成功",
  "data": {
    "loggedOut": true,
    "tokenRevoked": true
  }
}
```

#### 1.8 第三方登录

**接口**: `/auth/social-login`
**方法**: POST
**说明**: 使用第三方平台进行登录

**请求参数**:
```json
{
  "provider": "wechat",
  "authCode": "auth_code_from_provider",
  "deviceId": "device12345"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "社交登录成功",
  "data": {
    "userId": "user12345",
    "name": "张三",
    "provider": "wechat",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "isNewUser": false
  }
}
```

### 2. 多模态服务API

#### 2.1 图像识别分析

**接口**: `/ai/ocr/analyze`
**方法**: POST
**说明**: 使用通义千文多模态大模型分析食品包装图像

**请求参数**:
```json
{
  "image": "二进制图像数据",
  "preferredLanguage": "zh-CN",
  "extractOptions": {
    "extractNutrition": true,
    "extractIngredients": true,
    "extractProductInfo": true
  }
}
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "scanId": "scan12345",
    "processingStatus": "completed",
    "processingTime": 2.1,
    "productInfo": {
      "name": "有机纯牛奶",
      "brand": "蒙牛",
      "netWeight": "250ml",
      "confidence": 0.95
    },
    "nutritionTable": {
      "detected": true,
      "boundingBox": [50, 100, 300, 400],
      "extractedData": {
        "servingSize": {
          "value": 100,
          "unit": "ml"
        },
        "nutrients": [
          {
            "name": "能量",
            "value": 65,
            "unit": "kcal",
            "confidence": 0.96
          },
          {
            "name": "蛋白质",
            "value": 3.2,
            "unit": "g",
            "confidence": 0.95
          }
          // 更多营养素...
        ]
      }
    },
    "ingredientsList": {
      "detected": true,
      "boundingBox": [50, 500, 300, 600],
      "extractedText": "纯牛奶，维生素D",
      "parsedIngredients": [
        {
          "name": "牛奶",
          "isMainIngredient": true,
          "confidence": 0.98
        }
        // 更多成分...
      ],
      "potentialAllergens": ["牛奶"],
      "confidence": 0.96
    }
  }
}
```

#### 2.2 营养成分表提取

**接口**: `/ai/ocr/extract-nutrition`
**方法**: POST
**说明**: 专门提取营养成分表

**请求参数**:
```json
{
  "image": "二进制图像数据",
  "language": "zh-CN",
  "enhanceQuality": true
}
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "servingSize": {
      "value": 100,
      "unit": "ml"
    },
    "servingsPerContainer": 2.5,
    "nutrients": [
      {
        "name": "能量",
        "value": 65,
        "unit": "kcal",
        "confidence": 0.96
      },
      // 更多营养素...
    ],
    "confidence": 0.92,
    "imageQuality": "good"
  }
}
```

### 3. 营养分析API

#### 3.1 食品个性化分析

**接口**: `/ai/analyze/food`
**方法**: POST
**说明**: 获取单个食品的个性化营养分析

**请求参数**:
```json
{
  "foodId": "f12345678",
  "servingSize": 200,
  "servingUnit": "ml",
  "userContext": true,
  "analysisDimensions": ["healthGoal", "nutritionBalance", "ingredients", "alternatives"]
}
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "analysisId": "ana123456",
    "foodInfo": {
      "foodId": "f12345678",
      "name": "有机纯牛奶",
      "brand": "蒙牛"
    },
    "userContext": {
      "healthGoal": "weightLoss",
      "dietaryRestrictions": ["lactoseIntolerance"]
    },
    "suitabilityScore": 3.5,
    "nutritionAnalysis": {
      "strengths": [
        {
          "nutrient": "蛋白质",
          "explanation": "对于您的增肌目标，这款食品的蛋白质含量适中，每200ml提供约6.4g蛋白质。"
        }
        // 更多优势...
      ],
      "concerns": [
        {
          "nutrient": "乳糖",
          "explanation": "考虑到您的乳糖不耐受情况，普通牛奶可能会引起消化不适。"
        }
        // 更多劣势...
      ]
    },
    "consumptionSuggestion": {
      "recommendedServing": "150-200ml",
      "frequency": "可以适量饮用，但不建议每日摄入超过一杯(200ml)"
    },
    "alternatives": [
      {
        "foodId": "f23456789",
        "name": "无乳糖有机牛奶",
        "brand": "蒙牛",
        "reason": "营养成分相似但不含乳糖，更适合您的体质"
      }
      // 更多替代食品...
    ]
  }
}
```

#### 3.2 食品对比分析

**接口**: `/ai/analyze/comparison`
**方法**: POST
**说明**: 对比两种食品并获取个性化建议

**请求参数**:
```json
{
  "firstFoodId": "f12345678",
  "secondFoodId": "f23456789",
  "comparisonType": "weightLoss",
  "customDimensions": ["protein", "sugar", "fat"],
  "userContext": true
}
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "comparisonId": "comp987654",
    "foods": [
      {
        "foodId": "f12345678",
        "name": "有机纯牛奶",
        "brand": "蒙牛"
      },
      {
        "foodId": "f23456789",
        "name": "无乳糖有机牛奶",
        "brand": "蒙牛"
      }
    ],
    "comparisonResults": {
      "overall": {
        "winner": "f23456789",
        "score": {
          "f12345678": 3.5,
          "f23456789": 4.2
        },
        "explanation": "基于您的减重目标，无乳糖有机牛奶整体更优，热量略低且不含乳糖。"
      },
      "dimensions": [
        {
          "name": "蛋白质",
          "winner": "tie",
          "values": {
            "f12345678": 3.2,
            "f23456789": 3.2
          },
          "explanation": "两种产品蛋白质含量相同。"
        },
        // 更多维度对比...
      ]
    },
    "recommendation": {
      "preferredChoice": "f23456789",
      "reason": "考虑到您的乳糖不耐受和减重目标，无乳糖有机牛奶是更好的选择。"
    }
  }
}
```

### 4. 分享模板API

#### 4.1 获取可用模板

**接口**: `/templates`
**方法**: GET
**说明**: 获取可用的分享图片模板列表

**请求参数**:
```
?category=nutrition&season=current&limit=10&offset=0
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "templates": [
      {
        "templateId": "tmpl12345",
        "name": "简约营养评分",
        "category": "nutrition",
        "previewImageUrl": "https://cdn.nutritionscanapp.com/templates/tmpl12345_preview.jpg",
        "seasonality": "allYear",
        "isDownloaded": false,
        "fileSize": 45.6
      },
      // 更多模板...
    ],
    "pagination": {
      "total": 28,
      "limit": 10,
      "offset": 0
    }
  }
}
```

4.2 获取模板详情
接口: /templates/{templateId}
方法: GET
说明: 获取特定模板的详细信息
响应:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "templateId": "tmpl12345",
    "name": "简约营养评分",
    "category": "nutrition",
    "description": "简洁风格的营养评分模板，突出显示主要营养素和健康评级",
    "previewImageUrl": "https://cdn.nutritionscanapp.com/templates/tmpl12345_preview.jpg",
    "fullSizePreviewUrl": "https://cdn.nutritionscanapp.com/templates/tmpl12345_full.jpg",
    "seasonality": "allYear",
    "customizableElements": [
      {
        "id": "title",
        "type": "text",
        "defaultValue": "营养评分"
      },
      {
        "id": "background",
        "type": "color",
        "defaultValue": "#FFFFFF"
      }
    ],
    "dimensions": {
      "width": 1080,
      "height": 1920
    },
    "isDownloaded": false,
    "fileSize": 45.6,
    "lastUpdated": "2023-05-10T14:30:00Z"
  }
}
```

### 5. 食品数据API

#### 5.1 获取食品详情

**接口**: `/foods/{foodId}`
**方法**: GET
**说明**: 获取单个食品的详细信息

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "foodId": "f12345678",
    "name": "有机纯牛奶",
    "brand": "蒙牛",
    "category": "dairy",
    "barcode": "6923450657145",
    "imageUrl": "https://cdn.nutritionscanapp.com/foods/f12345678.jpg",
    "nutritionScore": "A",
    "nutritionData": {
      "calories": 65,
      "protein": 3.2,
      "fat": 3.6,
      "saturatedFat": 2.1,
      "transFat": 0.0,
      "carbohydrates": 4.8,
      "sugar": 4.8,
      "fiber": 0,
      "sodium": 40,
      "calcium": 120,
      "servingSize": 100,
      "servingUnit": "ml",
      "servingsPerContainer": 2.5
    },
    "ingredients": {
      "rawText": "纯牛奶，维生素D",
      "parsedIngredients": ["牛奶", "维生素D"],
      "containsAllergens": ["牛奶"]
    },
    "lastUpdated": "2023-05-10T14:30:00Z"
  }
}
```

#### 5.2 搜索食品

**接口**: `/foods/search`
**方法**: GET
**说明**: 搜索食品数据库

**请求参数**:
```
?query=牛奶&brand=蒙牛&category=dairy&limit=10&offset=0
```

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "results": [
      {
        "foodId": "f12345678",
        "name": "有机纯牛奶",
        "brand": "蒙牛",
        "category": "dairy",
        "nutritionScore": "A",
        "imageUrl": "https://cdn.nutritionscanapp.com/foods/f12345678_thumb.jpg"
      },
      // 更多搜索结果...
    ],
    "pagination": {
      "total": 15,
      "limit": 10,
      "offset": 0
    }
  }
}
```

### 6. 用户服务API

#### 6.1 获取用户营养目标

**接口**: `/users/nutrition-goals`
**方法**: GET
**说明**: 获取当前用户的营养目标设置

**响应**:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "goalId": "goal98765",
    "caloriesGoal": 2100,
    "proteinGoal": 85,
    "fatGoal": 70,
    "carbsGoal": 240,
    "sugarLimit": 50,
    "sodiumLimit": 2300,
    "fiberGoal": 25,
    "isCustomized": true,
    "createdAt": "2023-01-15T10:20:30Z",
    "updatedAt": "2023-04-05T14:25:10Z"
  }
}
```

#### 6.2 更新用户信息

**接口**: `/users/profile`
**方法**: PUT
**说明**: 更新当前用户的个人信息

**请求参数**:
```json
{
  "name": "张三",
  "gender": "male",
  "birthDate": "1990-01-01",
  "height": 175,
  "weight": 68,
  "activityLevel": 2,
  "dietaryPreferences": ["lowSugar", "highProtein"],
  "healthGoal": "muscleGain"
}
```

**响应**:
```json
{
  "status": 200,
  "message": "用户信息更新成功",
  "data": {
    "userId": "user12345",
    "name": "张三",
    "gender": "male",
    "birthDate": "1990-01-01",
    "height": 175,
    "weight": 68,
    "activityLevel": 2,
    "dietaryPreferences": ["lowSugar", "highProtein"],
    "healthGoal": "muscleGain",
    "updatedAt": "2023-06-15T08:30:00Z"
  }
}
```

## 五、关键实现细节

### 1. 营养评分算法

```swift
func calculateNutritionScore(nutritionData: NutritionData, ingredients: Ingredients) -> String {
    // 基于Nutri-Score算法改进的中国适用版本
    var positivePoints = 0
    var negativePoints = 0
    
    // 计算负面因素得分（越少越好）
    let caloriesDensity = nutritionData.calories / nutritionData.servingSize
    negativePoints += calculatePointsByRange(value: caloriesDensity, ranges: [60, 80, 100, 120, 140, 160, 180, 200, 220, 240])
    
    let sugarContent = nutritionData.sugar / nutritionData.servingSize * 100
    negativePoints += calculatePointsByRange(value: sugarContent, ranges: [4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45])
    
    let saturatedFatContent = nutritionData.saturatedFat / nutritionData.servingSize * 100
    negativePoints += calculatePointsByRange(value: saturatedFatContent, ranges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    
    let sodiumContent = nutritionData.sodium / nutritionData.servingSize
    negativePoints += calculatePointsByRange(value: sodiumContent, ranges: [90, 180, 270, 360, 450, 540, 630, 720, 810, 900])
    
    // 计算正面因素得分（越多越好）
    let proteinContent = nutritionData.protein / nutritionData.servingSize * 100
    positivePoints += calculatePointsByRange(value: proteinContent, ranges: [1.6, 3.2, 4.8, 6.4, 8.0])
    
    let fiberContent = nutritionData.fiber / nutritionData.servingSize * 100
    positivePoints += calculatePointsByRange(value: fiberContent, ranges: [0.9, 1.9, 2.8, 3.7, 4.7])
    
    // 分析添加剂和配料
    let additivesPenalty = calculateAdditivesPenalty(ingredients: ingredients)
    
    // 最终得分计算
    let finalScore = positivePoints - negativePoints - additivesPenalty
    
    // 转换为A-E评分
    return convertToLetterGrade(score: finalScore)
}

private func calculatePointsByRange(value: Double, ranges: [Double]) -> Int {
    for (index, threshold) in ranges.enumerated() {
        if value < threshold {
            return index
        }
    }
    return ranges.count
}

private func calculateAdditivesPenalty(ingredients: Ingredients) -> Int {
    // 基于配料表分析添加剂数量和类型的惩罚分数
    let additives = detectAdditives(ingredients: ingredients.parsedIngredients)
    return min(additives.count, 5) // 最多5分惩罚
}

private func convertToLetterGrade(score: Int) -> String {
    switch score {
    case ...(-1): return "E"
    case 0...2: return "D"
    case 3...10: return "C"
    case 11...18: return "B"
    default: return "A"
    }
}
```

### 2. 食品PK对比算法

```swift
func compareFoods(food1: FoodItem, food2: FoodItem, dimensions: [ComparisonDimension], healthGoal: GoalType) -> ComparisonResult {
    var dimensionResults: [DimensionResult] = []
    var overallScore1 = 0.0
    var overallScore2 = 0.0
    
    // 标准化每100g/ml的营养数据，确保公平比较
    let nutrition1 = standardizeNutrition(nutrition: food1.nutritionData)
    let nutrition2 = standardizeNutrition(nutrition: food2.nutritionData)
    
    // 遍历每个对比维度
    for dimension in dimensions {
        let value1 = getNutrientValue(nutrition: nutrition1, dimension: dimension)
        let value2 = getNutrientValue(nutrition: nutrition2, dimension: dimension)
        
        // 确定哪个值更好（根据维度类型和健康目标）
        let betterValue = getBetterValue(value1: value1, value2: value2, dimension: dimension, healthGoal: healthGoal)
        let winner = betterValue == value1 ? food1.foodId : 
                     betterValue == value2 ? food2.foodId : "tie"
        
        // 计算维度权重（根据健康目标）
        let weight = getDimensionWeight(dimension: dimension, healthGoal: healthGoal)
        
        // 更新总分
        if winner == food1.foodId {
            overallScore1 += weight
        } else if winner == food2.foodId {
            overallScore2 += weight
        } else {
            // 平局，两者都加一半权重
            overallScore1 += weight / 2
            overallScore2 += weight / 2
        }
        
        // 生成对比说明
        let explanation = generateComparisonExplanation(
            dimension: dimension, 
            value1: value1, 
            value2: value2, 
            winner: winner,
            healthGoal: healthGoal
        )
        
        dimensionResults.append(DimensionResult(
            dimension: dimension,
            winner: winner,
            values: [food1.foodId: value1, food2.foodId: value2],
            explanation: explanation
        ))
    }
    
    // 确定总体赢家
    let overallWinner = overallScore1 > overallScore2 ? food1.foodId :
                        overallScore2 > overallScore1 ? food2.foodId : "tie"
    
    // 生成整体建议
    let recommendation = generateOverallRecommendation(
        food1: food1,
        food2: food2,
        dimensionResults: dimensionResults,
        overallWinner: overallWinner,
        healthGoal: healthGoal
    )
    
    return ComparisonResult(
        comparisonId: UUID().uuidString,
        firstFoodId: food1.foodId,
        secondFoodId: food2.foodId,
        dimensions: dimensionResults,
        overallWinner: overallWinner,
        overallScores: [food1.foodId: normalizeScore(overallScore1), food2.foodId: normalizeScore(overallScore2)],
        recommendation: recommendation,
        healthGoal: healthGoal,
        comparisonDate: Date()
    )
}

// 标准化分数为1-5范围
private func normalizeScore(_ score: Double) -> Double {
    return min(5.0, max(1.0, 1.0 + score * 4.0 / 10.0))
}
```

### 3. 图片分享生成算法

```swift
func generateShareImage(food: FoodItem, template: ShareTemplate, customizations: [String: Any]) -> UIImage {
    // 创建画布
    let size = template.dimensions
    UIGraphicsBeginImageContextWithOptions(size, false, 0.0)
    defer { UIGraphicsEndImageContext() }
    
    // 绘制背景
    let backgroundColor = customizations["backgroundColor"] as? UIColor ?? UIColor.white
    backgroundColor.setFill()
    UIRectFill(CGRect(origin: .zero, size: size))
    
    // 绘制模板背景图
    if let templateBackground = UIImage(named: template.backgroundImageName) {
        templateBackground.draw(in: CGRect(origin: .zero, size: size))
    }
    
    // 绘制食品封面图
    if let foodImage = loadFoodImage(url: food.imageUrl) {
        let foodImageRect = calculateFoodImageRect(templateType: template.type, size: size)
        drawRoundedImage(foodImage, in: foodImageRect, cornerRadius: 12)
    }
    
    // 绘制标题
    let title = customizations["title"] as? String ?? "\(food.name) 营养分析"
    drawText(
        text: title,
        rect: calculateTitleRect(templateType: template.type, size: size),
        attributes: [
            .font: UIFont.systemFont(ofSize: 24, weight: .bold),
            .foregroundColor: UIColor.black
        ]
    )
    
    // 绘制营养评分
    drawNutritionScore(
        score: food.nutritionScore,
        rect: calculateScoreRect(templateType: template.type, size: size)
    )
    
    // 绘制主要营养素数据
    drawNutritionData(
        nutritionData: food.nutritionData,
        rect: calculateNutritionDataRect(templateType: template.type, size: size)
    )
    
    // 绘制品牌和日期信息
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .medium
    let dateString = dateFormatter.string(from: Date())
    
    drawText(
        text: "\(food.brand) · \(dateString)",
        rect: calculateFooterRect(templateType: template.type, size: size),
        attributes: [
            .font: UIFont.systemFont(ofSize: 14, weight: .regular),
            .foregroundColor: UIColor.gray
        ]
    )
    
    // 绘制水印
    if let watermark = customizations["watermark"] as? String, !watermark.isEmpty {
        drawWatermark(text: watermark, size: size)
    }
    
    // 获取生成的图像
    guard let generatedImage = UIGraphicsGetImageFromCurrentImageContext() else {
        return UIImage()
    }
    
    return generatedImage
}
```