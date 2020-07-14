import csv
import random
import math
from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)
from otree_redwood.models import DecisionGroup

author = 'Your name here'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'rational_inattention'
    players_per_group = None
    num_rounds = 3
    endowment = 100

    def get_round_number(self):
        return self.round_number

class Subsession(BaseSubsession):
    # initial values of fields for players for each subsession
    def creating_session(self):
        for p in self.get_players():
            p.default_probability = int(random.uniform(0, 100))
            p.m = int(random.uniform(0, 100))
            p.y = int(random.uniform(0, 100))
            p.q = int(random.uniform(0, 100))


class Group(DecisionGroup):
    pass


class Player(BasePlayer):
    # amount of money player starts with
    spend = models.FloatField(
        min=0,
        max=Constants.endowment
    )
    default_probability = models.IntegerField()
    m = models.IntegerField()
    y = models.IntegerField()
    q = models.IntegerField()