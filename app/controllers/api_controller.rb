class ApiController < ApplicationController
    def special
        render json: Item.all
    end
    def updateScore
    end
    def updateLevel
    end
    def getScore
    end
    def getLevel
    end
end
