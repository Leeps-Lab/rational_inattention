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
    test = 10
    g = []
    m = []
    y = []
    q = []

#reads straight from the config file constants
    with open('rational_inattention/configs/config_file.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            num_rounds = int(row['num_rounds'])
            endowment = int(row['endowment'])
            initial_bonds = int(row['initial_bonds'])
            buy_option = True if row['buy_option'] == 'True' else False
            sell_option = True if row['sell_option'] == 'True' else False
            randomize_data = True if row['randomize_data'] == 'True' else False
# script to create a csv document with uniformly generated values for each variable
    if(randomize_data):
        with open('rational_inattention/configs/data.csv', 'w', newline='') as csvfile:
            fieldnames = ['num_rounds', 'g' , 'm', 'y', 'q']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for i in range(1 , num_rounds + 1):
                    writer.writerow(dict([
                    ('num_rounds',i),
                    ('g', int(random.uniform(0, 100))),
                    ('m', int(random.uniform(0, 100))),
                    ('y', int(random.uniform(0, 100))),
                    ('q', int(random.uniform(0, 100))),
                    ]))
# reads from data.csv into lists
    with open('rational_inattention/configs/data.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            g.append(
                int(row['g'])
            )
            m.append(
                int(row['m'])
            )
            y.append(
                int(row['y'])
            )
            q.append(
                int(row['q'])
            )
    def get_round_number(self):
        return self.round_number

class Subsession(BaseSubsession):

# initial values of fields for players for each subsession
    def creating_session(self):
        for p in self.get_players():
            p.g = Constants.g[ self.round_number - 1]
            p.m = Constants.m[ self.round_number - 1]
            p.y = Constants.y[ self.round_number - 1]
            p.q = Constants.q[ self.round_number - 1]


class Group(DecisionGroup):
    pass


class Player(BasePlayer):
    # amount of money player starts with
    spend = models.FloatField(
        min=0,
        max=Constants.endowment
    )
    g = models.IntegerField()
    m = models.IntegerField()
    y = models.IntegerField()
    q = models.IntegerField()
    finish = models.BooleanField(initial=False)
